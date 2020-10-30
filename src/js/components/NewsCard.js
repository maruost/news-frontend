export default class NewsCard {
  constructor({
    template,
    keyword,
    link,
    date,
    title,
    text,
    source,
    url,
    api,
    id,
    isLogged,
  }) {
    this._keyword = keyword;
    this._link = link;
    this._date = date;
    this._title = title;
    this._text = text;
    this._source = source;
    this._template = template;
    this._api = api;
    this._url = url;
    this._isLogged = isLogged;
    this._id = id;
  }

  // creating card DOM element
  createCard() {
    const card = this._template.cloneNode(true).querySelector(".news-card");
    this._link ? (card.querySelector(".news-card__image").src = this._link) : 0;
    card.querySelector(".news-card__date").textContent = this._date;
    card.querySelector(".news-card__title").textContent = this._title;
    card.querySelector(".news-card__text").textContent = this._text;
    card.querySelector(".news-card__source").textContent = this._source;
    card.querySelector(".news-card__btn_key-word").textContent = this._keyword;

    this._cardElement = card;
    this._setEventListeners();
    return card;
  }

  _setEventListeners = (isLogged) => {
    this._iconBtn = this._cardElement.querySelector(".news-card__btn_icon");
    this._iconIcon = this._iconBtn.querySelector(".news-card__icon");
    this._deleteIcon = this._cardElement.querySelector("#delete-icon");
    this._message = this._cardElement.querySelector(".news-card__message");

    this._iconBtn.addEventListener("mouseover", this._toggleMessageByHover);
    this._iconBtn.addEventListener("mouseout", this._toggleMessageByHover);
    this._iconBtn.addEventListener("click", this._actByClick);
  };
  _remove = () => {
    this._iconBtn.removeEventListener("mouseover", this._toggleMessageByHover);
    this._iconBtn.removeEventListener("mouseout", this._toggleMessageByHover);
    this._iconBtn.removeEventListener("click", this._actByClick);

    this._cardElement.remove();
  };

  _deleteArticleFromDB = () => {
    this._api
      .removeArticle({
        partOfUrl: "articles",
        cardID: this._id,
      })
      .then((res) => {
        this._remove();
      })
      .catch((err) => console.log(err));
  };

  _save = () => {
    this._api
      .saveArticle({
        partOfUrl: "articles",
        keyword: this._keyword,
        title: this._title,
        text: this._text,
        date: this._date,
        source: this._source,
        link: this._url,
        image: this._link,
      })
      .then((res) => {
        console.log(this._id);
      })
      .catch((err) => console.log(err));
  };

  _toggleMessageByHover = () => {
    if (
      (this._isLogged && this._iconBtn.id === "delete-icon") ||
      (!this._isLogged && this._iconBtn.id === "save-icon")
    ) {
      this._toggleMessage();
    }
  };

  _toggleMessage = () => {
    this._message.classList.toggle("hide");
  };

  _actByClick = () => {
    if (this._iconBtn.id === "save-icon") {
      if (this._isLogged) {
        this._renderIcon();
        this._save();
      } else {
        event.target.setAttribute("disabled", true);
      }
    } else if (this._iconBtn.id === "delete-icon") {
      if (this._isLogged) {
        console.log("залог бин");
        this._deleteArticleFromDB();
      } else {
        event.target.setAttribute("disabled", true);
      }
    }
  };

  _renderIcon = () => {
    event.target.classList.toggle("news-card__icon_marked");
    event.target.setAttribute("disabled", true);
  };
}
