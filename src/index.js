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
  regLink,
  entryLink,
} from "./js/constants/constants";

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
signUpFormValidator.init(); // !!! НУЖНО ИСПРАВИТЬ ЧТО ПРИ ОТКРЫТИИ ОПРЕДЕЛННОГО ПОПАПА ИНИЦИИРУЕТСЯ ОПРЕДЕЛЕННАЯ ФОРМА
searchFormValidator.init();

// popups

const signUpPopup = new Popup({
  popup: registrationPopup,
  openButton: registrationButton,
  closeButton: closeRegistrationPopup,
  link: entryLink,
});

const signInPopup = new Popup({
  popup: authPopup,
  openButton: authButton,
  closeButton: closeAuthPopup,
  link: regLink,
});

const successPopup = new Popup({
  popup: signUpSuccessPopup,
  closeButton: closeSuccessPopup,
  link: regLink,
});

signUpPopup.setEventListeners();
signInPopup.setEventListeners();
successPopup.setEventListeners();

// API

const mainApi = new MainAPI(configMainApi);
const newsApi = new NewsApi(configNewsApi);

// authorization

signUpForm.addEventListener("submit", () => {
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
    })
    .catch((err) => console.log(err))
    .finally(() => {
      signUpPopup._close();
      signUpFormValidator.resetValidation();
      signUpFormValidator.setSubmitButtonState(false);
      signUpForm.reset();
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
      mainApi
        .getUserData({
          partOfUrl: "me",
        })
        .then((res) => {
          localStorage.setItem("name", res.data.name);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          headerElem.render({
            isLogged: isUserLogged,
            userName: localStorage.getItem("name"),
          });
        });
    })
    .catch((err) => console.log(err))
    .finally(() => {
      signInPopup._close();
      signInFormValidator.resetValidation();
      signInFormValidator.setSubmitButtonState(false);
      signInForm.reset();
    });
});

//обработчик клика по кнопке поиска новостей

searchForm.addEventListener("submit", () => {
  event.preventDefault();
  allArticles = [];
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
    })
    .then((res) => {
      if (res.articles.length !== 0) {
        res.articles.forEach((item) => {
          allArticles.push(item);
        });
        newsList.renderCard(allArticles.splice(0, 3));
        searchResults.renderResults();
      } else {
        console.log("whf?!!");
        searchResults.renderNotFound();
      }
    }) // вынести кнопку шоу море за пределы события сабмита
    .then(() => {
      searchResults.setEventListeners(allArticles);
    })
    .catch((err) => searchResults.renderError())
    .finally(() => searchResults.renderLoading(false));
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

const newsList = new NewsCardList({
  container: newsCardsContainer,
  cards: createCardsArray,
});

// newsApi.getCards('Apple', prevDate, currentDate, 100).then((res) => {
//   newsList.renderCard(res);
// });

let allArticles = [];

const searchResults = new SearchResults({
  container: searchResultsContainer,
  showMoreBtn: showMoreButton,
  renderNews: newsList.renderCard,
});

searchResults.init();

// нужно исправить: кнопка показать еще скрывается когда ищещь что-то новое
// какие-то левые новости остаются в списке новостей

exitButton.addEventListener("click", () => {
  document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  location.reload();
});

// showMoreButton.addEventListener("click", () => {
//   if (allArticles.length > 3) {
//     newsList.renderCard(allArticles.splice(0, 3));
//   } else {
//     newsList.renderCard(allArticles.splice(0, 3));
//     showMoreButton.classList.add("hide");
//   }
// });

// })();
