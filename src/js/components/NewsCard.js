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

  _setEventListeners() {
    this._saveBtn = this._cardElement.querySelector(".news-card__btn_icon");
    this._saveIcon = this._saveBtn.querySelector(".news-card__icon");
    this._deleteIcon = this._cardElement.querySelector("#delete-icon");

    if (this._isLogged) {
      if (this._saveBtn.id !== "delete-icon") {
        this._saveBtn.removeEventListener("mouseover", this._toggleMessage);
        this._saveBtn.addEventListener("click", () => {
          this._renderIcon();
          this._save();
        });
      } else {
        this._saveBtn.addEventListener("mouseover", this._toggleMessage);
        console.log("delete");
        this._saveBtn.addEventListener("click", this._deleteArticleFromDB);
      }
    } else {
      if (!this._saveBtn.id !== "delete-icon") {
        this._saveBtn.addEventListener("mouseover", this._toggleMessage);
      }
    }
  }

  _remove = () => {
    this._saveBtn.removeEventListener("mouseover", this._toggleMessage);
    this._saveBtn.removeEventListener("mouseover", this._toggleMessage);

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
        this._getId(res.data._id);
      })
      .catch((err) => console.log(err));
  };

  _toggleMessage = () => {
    this._message = this._cardElement.querySelector(".news-card__message");
    this._message.classList.remove("hide");

    this._saveBtn.addEventListener("mouseout", () => {
      this._message.classList.add("hide");
    });
  };

  _renderIcon = () => {
    event.target.classList.toggle("news-card__icon_marked");
    event.target.setAttribute("disabled", true);
  };
}
