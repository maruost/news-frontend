import "./styles/index.css";
import Popup from "./js/components/Popup";
import FormValidator from "./js/components/FormValidator.js";
import Header from "./js/components/Header.js";

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
const header = document.querySelector('.header');
const hamburgerMenuButton = document.querySelector('.header__menu-icon');
console.log(hamburgerMenuButton)
const errorMessages = {
  empty: "Это обязательное поле",
  wrongLength: "Должно быть от 2 до 30 символов",
  wrongType: "Здесь должна быть ссылка",
  printEmail: "Введите действующий e-mail",
};

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

signInFormValidator.init();

const signUpFormValidator = new FormValidator({
  form: signUpForm,
  closeButton: closeRegistrationPopup,
  errorMessages,
});

signUpFormValidator.init();

// work of signup popup

signUpForm.addEventListener("submit", () => {
  event.preventDefault();
  // successPopup._open().bind();
  signUpPopup._close();
  signUpFormValidator.resetValidation();
  signUpFormValidator.setSubmitButtonState(false);
  signUpForm.reset();

});

// })();
