export default class Header {
  constructor({ header, props }) {
    this._header = header;
  }

  render = ({ ...props }) => {
    if (props.isLogged) {
      for (let elem of this._menu.children) {
        console.log(elem);
        if (elem.id !== "header-main-link") {
          elem.classList.toggle("hide");
        }
        this._menu.querySelector('.header__name').textContent = props.userName;
      }
    }
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
    this._menuIconWrapper.addEventListener("click", this._toggleMenu);
  }

  _toggleMenu = () => {
    this._menuIcon.classList.toggle("header__menu-icon_active");
    this._menu.classList.toggle("header__menu_is-opened");
    this._header.classList.toggle("header_menu-is-opened");
    this._fill.classList.toggle("header__fill_menu-is-opened");
  };
}
