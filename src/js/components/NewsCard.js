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
    console.log(this._keyword);
  }

  // creating card DOM element
  createCard() {
    const card = this._template.cloneNode(true).querySelector(".news-card");
    card.querySelector(".news-card__image").src = this._link;
    card.querySelector(".news-card__date").textContent = this._date;
    card.querySelector(".news-card__title").textContent = this._title;
    card.querySelector(".news-card__text").textContent = this._text;
    card.querySelector(".news-card__source").textContent = this._source;

    this._cardElement = card;
    this._setEventListeners();
    return card;
  }

  _setEventListeners() {
    this._saveBtn = this._cardElement.querySelector("#save-icon");
    this._saveIcon = this._saveBtn.querySelector(".news-card__icon");
    this._deleteIcon = this._cardElement.querySelector("#delete-icon");

    if (this._isLogged) {
      this._saveBtn.addEventListener("click", () => {
        this._renderIcon();
        this._save();
      });
    } else {
      this._saveBtn.addEventListener("mouseover", () => {
        this._toggleMessage();
      });
    }
  }

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
      .catch((err) => console.log(err));
  };

  _toggleMessage = () => {
    this._message = this._cardElement.querySelector(".news-card__message");
    this._saveBtn.addEventListener("mouseover", () => {
      this._message.classList.remove("hide");
    });
    this._saveBtn.addEventListener("mouseout", () => {
      this._message.classList.add("hide");
    });
  };

  _renderIcon = () => {
    this._saveIcon.classList.toggle("news-card__icon_marked");
    this._saveBtn.setAttribute("disabled", true);
  };
}
// _removeFromDB = () => {
//   console.log(this._id)
//   this._api.removeArticle({
//     partOfUrl: "articles",
//     cardId: this._id,
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err))
// };

// _cardAction = () => {
//   this._renderIcon();
//   if (this._saveIcon.classList.contains("news-card__icon_marked")) {
//     this._save();
//   } else {
//     this._removeFromDB();
//   }
// };
