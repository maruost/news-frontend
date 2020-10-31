export default class FormValidator {
  constructor({ form, closeButton, errorMessages }) {
    this._form = form;
    this._closeButton = closeButton;
    this._errorMessages = errorMessages;
  }

  _getErrorSpan = (element) => {
    if (element.name) {
      return this._form.querySelector(`.error[data-for="${element.name}"]`);
    } else {
      return this._form.querySelector(
        `.error[data-for="${element.dataset.for}"]`
      );
    }
  };

  init = () => {
    this._button = this._form.querySelector(".button");
    this._inputs = Array.from(this._form.querySelectorAll("input"));
    this._errorsElements = Array.from(this._form.querySelectorAll(".error"));
    this.setEventListeners();
  };

  _handlerInputForm = (event) => {
    this._checkInputValidity(event.target);
    if (this._inputs.every(this._checkInputValidity)) {
      this.setSubmitButtonState(true);
    } else {
      this.setSubmitButtonState(false);
    }
  };

  showButtonMesage = (err) => {
    this.setSubmitButtonState(false);
    if (err === 401) {
      console.log("Неправильные почта или пароль");
      return (this._getErrorSpan(this._button).textContent =
        "Неправильные почта или пароль");
    }
    if (err === 409) {
      console.log("Неправильные почта или пароль");
      return (this._getErrorSpan(this._button).textContent =
        "Такой пользователь уже существует");
    }
    if (err === 400) {
      console.log("Проверьте правильность заполнения полей");
      return (this._getErrorSpan(this._button).textContent =
        "Проверьте правильность заполнения полей");
    } else {
      console.log(err);
      this._getErrorSpan(this._button).textContent = "Что-то пошло не так";
    }
  };

  _checkInputValidity = (input) => {
    if (input.validity.valid) {
      this._getErrorSpan(input).textContent = "";
      return true;
    }

    if (input.validity.valueMissing) {
      if (input.type !== "search") {
        this._getErrorSpan(input).textContent = this._errorMessages.empty;
      } else {
        this._getErrorSpan(input).textContent = this._errorMessages.missKeyWord;
      }
      return false;
    }

    if (input.validity.tooShort) {
      if (input.name !== "password") {
        this._getErrorSpan(input).textContent = this._errorMessages.wrongLength;
      } else {
        this._getErrorSpan(
          input
        ).textContent = this._errorMessages.wrongLengthPassword;
      }
      return false;
    }

    if (input.validity.typeMismatch && input.type === "url") {
      this._getErrorSpan(input).textContent = this._errorMessages.wrongType;
      return false;
    }

    if (input.validity.typeMismatch && input.type === "email") {
      this._getErrorSpan(input).textContent = this._errorMessages.printEmail;
      return false;
    }

    return input.checkValidity();
  };

  setSubmitButtonState = (state) => {
    if (!state) {
      this._button.setAttribute("disabled", true);
      this._button.classList.remove("button_active");
      this._button.classList.add("button_disabled");
    } else {
      this._button.removeAttribute("disabled");
      this._button.classList.add("button_active");
      this._button.classList.remove("button_disabled");
    }
  };

  resetValidation = () => {
    this._errorsElements.forEach((el) => {
      el.textContent = "";
    });
  };

  setEventListeners = () => {
    this._form.addEventListener("input", (event) => {
      this._handlerInputForm(event);
      this._getErrorSpan(this._button).textContent = "";
    });
  };
}
