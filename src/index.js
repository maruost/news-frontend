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

// (function () {
const registrationButton = document.querySelector("#reg-header-btn");
const registrationPopup = document.querySelector("#popup-signup");
const closeRegistrationPopup = document.querySelector("#popup-signup-close");
const authButton = document.querySelector("#auth-header-btn");
const authPopup = document.querySelector("#popup-signin");
const closeAuthPopup = document.querySelector("#popup-signin-close");
const closeSuccessPopup = document.querySelector("#popup-success-close");
const signUpSuccessPopup = document.querySelector("popup-success");
const signInForm = document.forms.login;
const signUpForm = document.forms.registration;
const searchForm = document.forms.search;
const header = document.querySelector(".header");
const cardTemplate = document.querySelector("#news-card-template").content;
console.log(cardTemplate);
const newsCardsContainer = document.querySelector(".news-list");
const searchButton = document.querySelector(".search-form__button");
const now = new Date();
const currentDate = dateFormat(now);
const prevDate = dateFormat(findPrevDate(now, 7));
const showMoreButton = document.querySelector('.search-results__button')

console.log(currentDate, prevDate);

const errorMessages = {
  empty: "Это обязательное поле",
  wrongLength: "Должно быть от 2 до 30 символов",
  wrongType: "Здесь должна быть ссылка",
  printEmail: "Введите действующий e-mail",
  missKeyWord: "Нужно ввести ключевое слово",
};
const config = {
  url:
    NODE_ENV === "production"
      ? "https://newsapi.org/v2/everything"
      : "https://newsapi.org/v2/everything",
  headers: {
    authorization: "0c94ed05a1c74e599d2ccbf92efbc3dc",
  },
};
const newsApi = new NewsApi(config);

//popups
const signUpPopup = new Popup({
  popup: registrationPopup,
  openButton: registrationButton,
  closeButton: closeRegistrationPopup,
});

signUpPopup.setEventListeners();

const signInPopup = new Popup({
  popup: authPopup,
  openButton: authButton,
  closeButton: closeAuthPopup,
});

signInPopup.setEventListeners();

const successPopup = new Popup({
  popup: signUpSuccessPopup,
  closeButton: closeSuccessPopup,
});

successPopup.setEventListeners();

// humburger-menu

const headerElem = new Header({
  header: header,
});

headerElem.init();
headerElem.setEventListeners();

// validation

const signInFormValidator = new FormValidator({
  form: signInForm,
  closeButton: closeAuthPopup,
  errorMessages,
});

// signInFormValidator.init();

const signUpFormValidator = new FormValidator({
  form: signUpForm,
  closeButton: closeRegistrationPopup,
  errorMessages,
});

signUpFormValidator.init(); // !!! НУЖНО ИСПРАВИТЬ ЧТО ПРИ ОТКРЫТИИ ОПРЕДЕЛННОГО ПОПАПА ИНИЦИИРУЕТСЯ ОПРЕДЕЛЕННАЯ ФОРМА

const searchFormValidator = new FormValidator({
  form: searchForm,
  errorMessages,
});

searchFormValidator.init();

// work of signup popup

signUpForm.addEventListener("submit", () => {
  event.preventDefault();
  // successPopup._open().bind();
  signUpPopup._close();
  signUpFormValidator.resetValidation();
  signUpFormValidator.setSubmitButtonState(false);
  signUpForm.reset();
});

//

//обработчик клика по кнопке поиска новостей

const createCardsArray = function (res) {
  const array = [];
  console.log(res);
  res.forEach((card) => {
    array.push(
      new NewsCard({
        template: cardTemplate,
        link: card.urlToImage,
        date: dateWithMontsName(dateFormat(card.publishedAt)),
        title: card.title,
        text: card.description,
        source: card.source.name,
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

const allArticles = [];

searchForm.addEventListener("submit", () => {
  event.preventDefault();
  newsApi
    .getCards({
      request: searchForm.elements["search-field"].value,
      prevDate: prevDate,
      currentDate: currentDate,
      pageSize: 100,
    })
    .then((res) => {
      res.articles.forEach((item) => {
        allArticles.push(item);
      });
      newsList.renderCard(allArticles.splice(0, 3));
    })
    .catch((err) => console.log(err));
});

showMoreButton.addEventListener('click', () => {
  if (allArticles.length > 3) {
    newsList.renderCard(allArticles.splice(0, 3));
  } else {
    newsList.renderCard(allArticles.splice(0, 3));
    showMoreButton.setAttribute("disabled", true);
    showMoreButton.classList.add("button_disabled");
  }
});

// })();
