export default class NewsCardList {
  constructor({ container, cards }) {
    this._container = container;
    this._cards = cards;
  }

  // adding card to newslist container
  addCard(card) {
    this._container.append(card);
  }

  //render newslist
  renderCard = (res) => {
    this._cards(res).forEach((card) => {
      this.addCard(card)
    });
  }

}

