import "./styles/index.css";
import Popup from "./js/components/Popup";
import FormValidator from "./js/components/FormValidator";
import Header from "./js/components/Header";
import NewsCard from "./js/components/NewsCard";
import NewsCardList from "./js/components/NewsCardList";
import NewsApi from "./js/api/NewsApi";
import {
  findPrevDate,
  dateFormat,
  dateWithMontsName,
} from "./js/utils/dateFormat";

import { isUserLogged } from "./js/utils/checkLogin";

import SearchResults from "./js/components/SearchResults";
import MainAPI from "./js/api/MainApi";

import { configNewsApi, configMainApi } from "./js/configs/configs";
import { errorHandler } from "./js/utils/errorHandler";
import { userDataCleaner } from "./js/utils/userDataCleaner";

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
  header,
  newsCardsContainer,
  searchResultsContainer,
  foundResults,
  notFound,
  exitButton,
} from "./js/constants/constants";

const headerElem = new Header({
  header: header,
});

// initialization header hamburger menu

headerElem.init();
headerElem.render({
  isLogged: isUserLogged(),
  userName: localStorage.getItem("name"),
});

// date
const now = new Date();
const currentDate = dateFormat(now);
const prevDate = dateFormat(findPrevDate(now, 7));

// validation
const signInFormValidator = new FormValidator({
  form: signInForm,
  closeButton: closeAuthPopup,
  errorMessages,
});

const signUpFormValidator = new FormValidator({
  form: signUpForm,
  closeButton: closeRegistrationPopup,
  errorMessages,
});

const searchFormValidator = new FormValidator({
  form: searchForm,
  errorMessages,
});

signInFormValidator.init();
signUpFormValidator.init();
searchFormValidator.init();

// popups

const signUpPopup = new Popup({
  popup: registrationPopup,
  openButton: registrationButton,
  closeButton: closeRegistrationPopup,
});

const signInPopup = new Popup({
  popup: authPopup,
  openButton: authButton,
  closeButton: closeAuthPopup,
  popupToOpen: signUpPopup,
});

const successPopup = new Popup({
  popup: signUpSuccessPopup,
  closeButton: closeSuccessPopup,
  popupToOpen: signInPopup,
});

signInPopup.setEventListeners(signUpPopup);
signUpPopup.setEventListeners(signInPopup);
successPopup.setEventListeners(signInPopup);

// API

const mainApi = new MainAPI(configMainApi);
const newsApi = new NewsApi(configNewsApi);

let allArticles = [];

const createCardsArray = function (res) {
  const array = [];
  res.forEach((card) => {
    array.push(
      new NewsCard({
        template: cardTemplate,
        keyword: searchForm.elements["search-field"].value,
        link: card.urlToImage
          ? card.urlToImage
          : "https://enix.ru/wp-content/uploads/2019/05/1531075372no_foto.jpg",
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

const newsList = new NewsCardList({
  container: newsCardsContainer,
  cards: createCardsArray,
});

const searchResults = new SearchResults({
  container: searchResultsContainer,
  showMoreBtn: showMoreButton,
  renderNews: newsList.renderCard,
});

searchResults.init();

// authorization

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  mainApi
    .signup({
      partOfUrl: "signup",
      email: signUpForm.elements.email.value,
      name: signUpForm.elements.name.value,
      password: signUpForm.elements.password.value,
    })
    .then((res) => {
      successPopup._open();
      signUpPopup._close();
      signUpFormValidator.resetValidation();
      signUpFormValidator.setSubmitButtonState(false);
      signUpForm.reset();
    })
    .catch((err) => {
      signUpFormValidator.showButtonMesage(err);
      errorHandler(err);
    });
});

// authentication

signInForm.addEventListener("submit", () => {
  event.preventDefault();
  mainApi
    .signin({
      partOfUrl: "signin",
      email: signInForm.elements.email.value,
      password: signInForm.elements.password.value,
    })
    .then(() => {
      document.cookie = "SameSite=None; Secure";
      mainApi
        .getUserData({
          partOfUrl: "me",
        })
        .then((res) => {
          localStorage.setItem("name", res.data.name);
        })
        .catch((err) => {
          console.log("errr");
          console.log(err);
        })
        .finally(() => {
          headerElem.render({
            isLogged: isUserLogged,
            userName: localStorage.getItem("name"),
          });
        });
    })
    .then(() => {
      signInPopup._close();
      signInFormValidator.resetValidation();
      signInFormValidator.setSubmitButtonState(false);
      signInForm.reset();
      allArticles = [];
      newsList.clear();
      showMoreButton.classList.remove("hide");
      searchResults.setInitialState([
        searchResultsContainer,
        foundResults,
        notFound,
      ]);
    })
    .catch((err) => {
      signInFormValidator.showButtonMesage(err);
      errorHandler(err);
    });
});

// search btn handler

searchForm.addEventListener("submit", () => {
  event.preventDefault();
  let allArticles = [];
  newsList.clear();
  showMoreButton.classList.remove("hide");
  searchResults.setInitialState([
    searchResultsContainer,
    foundResults,
    notFound,
  ]);
  searchResults.renderLoading(true);
  newsApi
    .getCards({
      request: searchForm.elements["search-field"].value,
      prevDate: prevDate,
      currentDate: currentDate,
      pageSize: 100,
      apiKey: "0c94ed05a1c74e599d2ccbf92efbc3dc",
    })
    .then((res) => {
      if (res.articles.length !== 0) {
        res.articles.forEach((item) => {
          allArticles.push(item);
        });
        searchResults.renderContainer(allArticles);
      } else {
        searchResults.renderNotFound();
      }
    })
    .catch((err) => {
      errorHandler(err);
      searchResults.renderError();
    })
    .finally(() => searchResults.renderLoading(false));
});

exitButton.addEventListener("click", () => {
  userDataCleaner();
});
