export default class NewsCard {
  constructor({template, link, date, title, text, source}) {
    this._link = link;
    this._date = date;
    this._title = title;
    this._text = text;
    this._source = source;
    this._template = template;
    console.log(this._template)
  }

  createCard() {
    const card = this._template.cloneNode(true).querySelector('.news-card');
    card.querySelector('.news-card__image').src = this._link;
    card.querySelector('.news-card__date').textContent = this._date;
    card.querySelector('.news-card__title').textContent = this._title;
    card.querySelector('.news-card__text').textContent = this._text;
    card.querySelector('.news-card__source').textContent = this._source;

    this._cardElement = card;
    // this._setEventListeners();
    return card;
  }


  // _setEventListeners() {
  //   this._likeIcon = this._cardElement.querySelector('.place-card__like-icon');
  //   this._deleteIcon = this._cardElement.querySelector('.place-card__delete-icon');
  //   this._image = this._cardElement.querySelector('.place-card__image');

  //   this._likeIcon.addEventListener('click', this._like)
  //   this._deleteIcon.addEventListener('click', this._remove)
  //   this._image.addEventListener('click', this.openImg);
  // }

  // _like = () => {
  //   this._likeIcon.classList.toggle('place-card__like-icon_liked');
  // }

  // _remove = () => {
  //   this._likeIcon.removeEventListener('click', this._like)
  //   this._deleteIcon.removeEventListener('click', this._remove)
  //   this._image.removeEventListener('click', this.openImg);

  //   this._cardElement.remove();
  // }

  // openImg = () => {
  //   this.openImageCallback(this._link)
  // }
}