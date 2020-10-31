export default class Popup {
  constructor({ popup, openButton = null, closeButton }) {
    this._popup = popup;
    this._openButton = openButton;
    this._closeButton = closeButton;
  }

  setEventListeners = (popupRedirect) => {
    this._link = this._popup.querySelector(".popup__link");
    if (this._openButton != null) {
      this._openButton.addEventListener("click", this.open);
    }
    this._closeButton.addEventListener("click", this.close);
    this._link.addEventListener("click", () => {
      this.close();
      popupRedirect.open();
    });
  };

  open = () => {
    this._popup.classList.add("popup_is-opened");
  };

  close = () => {
    this._popup.classList.remove("popup_is-opened");
  };
}
