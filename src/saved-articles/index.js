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
} from "../js/constants/constants";
import {
  findPrevDate,
  dateFormat,
  dateWithMontsName,
} from "../js/utils/dateFormat";

const now = new Date();
const currentDate = dateFormat(now);
const prevDate = dateFormat(findPrevDate(now, 7));

const headerElem = new Header({
  header: header,
});

// initialization header hamburger menu

headerElem.init();
headerElem.setEventListeners();
headerElem.render({
  isLogged: isUserLogged(),
  userName: localStorage.getItem("name"),
});

const newsList = new NewsCardList({
  container: newsCardsContainer,
  cards: createCardsArray,
});

const mainApi = new MainAPI(configMainApi);

mainApi
  .getArticles({
    partOfUrl: "articles",
  })
  .then((res) => {
    console.log(res);
    newsList.renderCard(res);
  })
  .catch((err) => console.log(err));

exitButton.addEventListener("click", () => {
  localStorage.removeItem("name");
  location.reload();
});


const createCardsArray = function (res) {
  const array = [];
  res.forEach((card) => {
    array.push(
      new NewsCard({
        template: cardTemplate,
        keyword: searchForm.elements["search-field"].value,
        link: card.urlToImage,
        date: dateWithMontsName(dateFormat(card.publishedAt)),
        title: card.title,
        text: card.description,
        source: card.source.name,
        url: card.url,
        api: mainApi,
        isLogged: isUserLogged(),
      }).createCard()
    );
  });

  return array;
};

