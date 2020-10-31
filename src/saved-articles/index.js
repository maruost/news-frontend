import { isUserLogged } from "../js/utils/checkLogin";

if (!isUserLogged()) {
  window.location.href = "index.html";
}

// styles
import "../styles/index.css";

// classes
import Header from "../js/components/Header";
import NewsCard from "../js/components/NewsCard";
import NewsCardList from "../js/components/NewsCardList";
import MainAPI from "../js/api/MainApi";
import SavedArticles from "../js/components/SavedArticles";

// configs
import { configMainApi } from "../js/configs/configs";

// constants
import {
  cardTemplate,
  exitButton,
  header,
  newsCardsContainer,
  savedArticlesContainer,
} from "../js/constants/constants";

// utils
import { titleText } from "../js/utils/titleTextFormat";
import { keysObj, byField } from "../js/utils/keysSorting";
import { errorHandler } from "../js/utils/errorHandler";
import { userDataCleaner } from "../js/utils/userDataCleaner";

const headerElem = new Header({
  header: header,
  theme: "header_theme_dark",
});

// initialization header hamburger menu

headerElem.init();

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
    const keysArr = keysObj(res.data);
    keysArr.sort(byField("frequency"));
    savedArticles.renderTitle(res.data.length);
    savedArticles.renderKeyWords(keysArr);
    newsList.renderCard(res.data);
  })
  .catch((err) => errorHandler(err));

exitButton.addEventListener("click", () => {
  userDataCleaner();
});
