function titleText(amount) {
  if (String(amount).match(/\d*1$/) && amount !== 11) {
    this._title.textContent = `${this._name}, у вас ${amount} сохранённая карточка`;
  } else if (
    String(amount).match(/\d*[05-9]$/) ||
    (amount > 10 && amount < 20)
  ) {
    this._title.textContent = `${this._name}, у вас ${amount} сохранённых карточек`;
  } else {
    this._title.textContent = `${this._name}, у вас ${amount} сохранённые карточки`;
  }
}

export { titleText };
