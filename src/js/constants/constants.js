const errorMessages = {
  empty: "Это обязательное поле",
  wrongLength: "Должно быть от 2 до 30 символов",
  wrongType: "Здесь должна быть ссылка",
  printEmail: "Введите действующий e-mail",
  missKeyWord: "Нужно ввести ключевое слово",
};

// popups
const registrationPopup = document.querySelector("#popup-signup");
const signUpSuccessPopup = document.querySelector("#popup-success");
const authPopup = document.querySelector("#popup-signin");

// popups elems: open buttons
const registrationButton = document.querySelector("#reg-header-btn");
const authButton = document.querySelector("#auth-header-btn");

// popups elems: close buttons
const closeAuthPopup = document.querySelector("#popup-signin-close");
const closeSuccessPopup = document.querySelector("#popup-success-close");
const closeRegistrationPopup = document.querySelector("#popup-signup-close");

// forms and forms elems
const signInForm = document.forms.login;
const signUpForm = document.forms.registration;
const searchForm = document.forms.search;

// templates
const cardTemplate = document.querySelector("#news-card-template").content;

// buttons
const showMoreButton = document.querySelector(".search-results__button");
const exitButton = document.querySelector("#exit-button");

// containers and blocks
const header = document.querySelector(".header");
const newsCardsContainer = document.querySelector(".news-list");
const searchResultsContainer = document.querySelector(".search-results");
const foundResults = document.querySelector(".search-results__container");
const notFound = document.querySelector(".not-found");

export {
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
};
