export default class SavedArticles {
  constructor({ name, articles }) {
    this._name = name;
    this._articles = articles;
  }

  renderTitle = () => {
    this._title = document.createElement('saved-articles__title');
    this._appendChild(this._title);
    this._title.textContent = `${this._name}, у вас ${this._articles.length} сохранённых статей`
  }

  renderKeywords = () => {
    this._keywords = document.createElement('saved-articles__keywords');
    this._appendChild(this._keywords);
    this._key.textContent = `${this._name}, у вас ${this._amount} сохранённых статей`
  }

  _appendChild (elem) {
    this._container.appendChild(elem);
  }
}