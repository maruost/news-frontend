export default class Header {
  constructor({ header, theme = null }) {
    this._header = header;
    this._theme = theme;
  }

  render = ({ isLogged }) => {
    if (isLogged) {
      for (let elem of this._menu.children) {
        if (elem.id !== "header-main-link") {
          elem.classList.toggle("hide");
        }
      }
      this.setOptions();
    }
  };

  setOptions = () => {
    console.log(localStorage.getItem("name"));
    this._menu.querySelector(
      ".header__name"
    ).textContent = localStorage.getItem("name");
    this._header.classList.add(this._theme);
  };

  init = () => {
    this._menuIconWrapper = document.querySelector(
      ".header__menu-icon-wrapper"
    );
    this._menuIcon = document.querySelector(".header__menu-icon");
    this._menu = document.querySelector(".header__menu");
    this._fill = document.querySelector(".header__fill");
  };

  setEventListeners() {
    this._menuIconWrapper.addEventListener("click", this._setResizeViwer);
  }

  _setResizeViwer = () => {
    this._toggleMenu();
    window.addEventListener("resize", this._closeMenu);
  };

  _closeMenu = () => {
    if ((window.innerWidth = 590)) {
      this._menuIcon.classList.toggle("header__menu-icon_active");
      this._menu.classList.toggle("header__menu_is-opened");
      this._header.classList.toggle("header_menu-is-opened");
      this._fill.classList.toggle("header__fill_menu-is-opened");
      window.removeEventListener("resize", this._closeMenu);
    }
  };

  _toggleMenu = () => {
    this._menuIcon.classList.toggle("header__menu-icon_active");
    this._menu.classList.toggle("header__menu_is-opened");
    this._header.classList.toggle("header_menu-is-opened");
    this._fill.classList.toggle("header__fill_menu-is-opened");
  };
}
