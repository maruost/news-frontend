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
    this._link
      ? (card.querySelector(".news-card__image").src = this._link)
      : "https://enix.ru/wp-content/uploads/2019/05/1531075372no_foto.jpg";
    Array.from(card.querySelectorAll(".news-card__descrtiption-link")).forEach(
      (item) => {
        item.href = `${this._url}`;
      }
    );
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
    this._iconBtn.removeEventListener("click", () => this._actByClick);

    this._cardElement.remove();
  };

  _deleteArticleFromDB = () => {
    this._api
      .removeArticle({
        partOfUrl: "articles",
        cardID: this._id,
      })
      .catch((err) => console.log(err));
  };

  _save = () => {
    console.log(this._link);
    return this._api
      .saveArticle({
        partOfUrl: "articles",
        keyword: this._keyword,
        title: this._title,
        text: this._text,
        date: this._date,
        source: this._source,
        link: this._link,
        image: this._link,
      })
      .then((res) => (this._id = res.data._id))
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
        if (!this._iconIcon.classList.contains("news-card__icon_marked")) {
          this._renderIcon();
          this._save();
        } else {
          this._renderIcon();
          this._deleteArticleFromDB();
        }
      } else {
        event.target.setAttribute("disabled", true);
      }
    } else if (this._iconBtn.id === "delete-icon") {
      if (this._isLogged) {
        console.log("залог бин");
        this._deleteArticleFromDB();
        this._remove();
      } else {
        event.target.setAttribute("disabled", true);
      }
    }
  };

  _renderIcon = () => {
    this._iconIcon.classList.toggle("news-card__icon_marked");
    this._iconIcon.setAttribute("disabled", true);
  };
}
