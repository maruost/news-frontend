export default class FormValidator {
  constructor({ form, closeButton, errorMessages }) {
    this._form = form;
    this._closeButton = closeButton;
    this._errorMessages = errorMessages;
  }

  _getErrorSpan = (element) => {
    return this._form.querySelector(`.error[data-for="${element.name}"]`);
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

  _checkInputValidity = (input) => {
    if (input.validity.valid) {
      this._getErrorSpan(input).textContent = "";
      return true;
    }

    if (input.validity.valueMissing) {
      if (this._form.name !== "search") {
        this._getErrorSpan(input).textContent = this._errorMessages.empty;
      } else {
        this._getErrorSpan(input).textContent = this._errorMessages.missKeyWord;
      }
      return false;
    }

    if (input.validity.tooShort) {
      this._getErrorSpan(input).textContent = this._errorMessages.wrongLength;
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
    this._form.addEventListener("input", (event) =>
      this._handlerInputForm(event)
    );
  };
}
