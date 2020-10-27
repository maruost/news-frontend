export default class SearchResults {
  constructor({ container, showMoreBtn, renderNews }) {
    this._container = container;
    this._button = showMoreBtn;
    this._newsList = renderNews;
  }

  // initialization of neede elements

  init = () => {
    this._notFound = this._container.querySelector(
      ".search-results__not-found"
    );
    this._loader = this._container.querySelector(".search-results__loader");
    this._title = this._notFound.querySelector(".not-found__title");
    this._subtitle = this._notFound.querySelector(".not-found__subtitle");
    this._results = this._container.querySelector(".search-results__container")
  };

  // render loader depending on its status (true - show, false - hide)
  renderLoading = (isLoading) => {
    this._showElement(this._container);
    if (isLoading) {
      this._showElement(this._loader);
    } else {
      this._hideElement(this._loader);
    }
  };

  setInitialState ([...items]) {
    items.forEach((item) => {
      this._hideElement(item);
    });
  }

  _showElement = (element) => {
    if (element.classList.contains("hide")) {
      element.classList.remove("hide");
    }
  };

  _hideElement = (element) => {
    if (!element.classList.contains("hide")) {
      element.classList.add("hide");
    }
  };

  // render error block when no results
  renderNotFound = () => {
    this._showElement(this._notFound);
    this._title.textContent = "Ничего не найдено";
    this._subtitle.textContent =
      "К сожалению, по вашему запросу ничего не найдено.";
  };

  // render error block when caught server error
  renderError = () => {
    // this._notFound.classList.remove("hide");
    this._showElement(this._notFound);
    this._title.textContent = "Oops!";
    this._subtitle.textContent =
      "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
  };

  renderResults = () => {
    this._showElement(this._results);
  }

  setEventListeners(articles) {
    console.log('peredali')
    console.log(articles);
    this._button.addEventListener("click", () => {
      this._showMore(articles);
    });
  }

  _showMore(articles) {
    if (articles.length > 3) {
      this._newsList(articles.splice(0, 3));
    } else {
      this._newsList(articles.splice(0, 3));
      this._hideElement(this._button);
    }

  }
}
