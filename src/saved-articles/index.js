console.log("fdfd");

if (!isUserLogged()) {
  window.location.href = "index.html";
}

import "../styles/index.css";
import Header from "../js/components/Header";
import NewsCard from "../js/components/NewsCard";
import NewsCardList from "../js/components/NewsCardList";

import { isUserLogged } from "../js/utils/checkLogin";

import SearchResults from "../js/components/SearchResults";
import MainAPI from "../js/api/MainApi";
import SavedArticles from "../js/components/SavedArticles";

import { configMainApi } from "../js/configs/configs";

// (function () {

import {
  errorMessages,
  registrationPopup,
  signUpSuccessPopup,
  authPopup,
  registrationButton,
  authButton,
  closeAuthPopup,
  closeSuccessPopup,
  closeRegistrationPopup,
  signInForm,
  signUpForm,
  searchForm,
  cardTemplate,
  showMoreButton,
  exitButton,
  header,
  newsCardsContainer,
  searchResultsContainer,
  foundResults,
  notFound,
  savedArticlesContainer,
} from "../js/constants/constants";
import {
  findPrevDate,
  dateFormat,
  dateWithMontsName,
} from "../js/utils/dateFormat";

import { titleText } from "../js/utils/titleTextFormat";
import { keysObj, byField } from "../js/utils/keysSorting";

const headerElem = new Header({
  header: header,
  theme: "header_theme_dark",
});

// initialization header hamburger menu

headerElem.init();
// headerElem.setEventListeners();
// headerElem.setOptions();

const mainApi = new MainAPI(configMainApi);

const savedArticles = new SavedArticles({
  container: savedArticlesContainer,
  api: mainApi,
  titleText: titleText,
});

savedArticles.renderTitle();

const createCardsArray = function (res) {
  const array = [];
  res.forEach((card) => {
    array.push(
      new NewsCard({
        template: cardTemplate,
        keyword: card.keyword,
        link: card.image
          ? card.image
          : "https://enix.ru/wp-content/uploads/2019/05/1531075372no_foto.jpg",
        date: card.date,
        title: card.title,
        text: card.text,
        source: card.source,
        url: card.link,
        api: mainApi,
        id: card._id,
        isLogged: isUserLogged,
      }).createCard()
    );
  });

  return array;
};

const newsList = new NewsCardList({
  container: newsCardsContainer,
  cards: createCardsArray,
});

mainApi
  .getArticles({
    partOfUrl: "articles",
  })
  .then((res) => {
    console.log(res.data);
    const keysArr = keysObj(res.data);
    keysArr.sort(byField("frequency"));
    savedArticles.renderTitle(res.data.length);
    savedArticles.renderKeyWords(keysArr);
    newsList.renderCard(res.data);
  })
  .catch((err) => console.log(err));

exitButton.addEventListener("click", () => {
  document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  location.reload();
});
