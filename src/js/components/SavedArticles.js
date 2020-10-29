export default class SavedArticles {
  constructor({ container, api, titleText }) {
    this._container = container;
    this._api = api;
    this._titleText = titleText;
  }

  renderTitle = (amount) => {
    this._name = localStorage.getItem("name");
    this._title = this._container.querySelector(".saved-articles__title");
    this._titleText(amount);
  };

  renderKeyWords = (keys) => {
    console.log;
    const len = keys.length;
    console.log(len);
    console.log(keys[0].keyword);
    if (len > 3) {
      this._title.insertAdjacentHTML(
        "afterend",
        `<p class="saved-articles__key-words">
      По ключевым словам: <span class="span-accent">${keys[0].keyword}, </span
      ><span class="span-accent">${keys[1].keyword}</span> и
      <span class="span-accent"> ${len - 2} другим</span>
    </p>`
      );
    } else if (len === 3) {
      this._title.insertAdjacentHTML(
        "afterend",
        `<p class="saved-articles__key-words">
      По ключевым словам: <span class="span-accent">${keys[0].keyword}, </span
      ><span class="span-accent">${keys[1].keyword}</span> и
      <span class="span-accent"> ${keys[2].keyword} </span>
    </p>`
      );
    } else if (len === 2) {
      this._title.insertAdjacentHTML(
        "afterend",
        `<p class="saved-articles__key-words">
    По ключевому слову: <span class="span-accent">${keys[0].keyword}, </span
    ><span class="span-accent">${keys[1].keyword}</span>
  </p>`
      );
    } else if (len === 1) {
      this._title.insertAdjacentHTML(
        "afterend",
        `<p class="saved-articles__key-words">
По ключевому слову: <span class="span-accent">${keys[0].keyword}
</p>`
      );
    } else if (len === 0) {
      this._title.insertAdjacentHTML(
        "afterend",
        `<p class="saved-articles__key-words">
  </p>`
      );
    }
  };
}
