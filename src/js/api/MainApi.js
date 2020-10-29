export default class MainApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  signup = ({ partOfUrl, email, password, name }) => {
    return fetch(`${this.url}${partOfUrl}`, {
      method: "POST",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).then((res) => this._checkStatus(res));
  };

  signin = ({ partOfUrl, email, password }) => {
    return fetch(`${this.url}${partOfUrl}`, {
      method: "POST",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => this._checkStatus(res));
  };

  getUserData = ({ partOfUrl }) => {
    return fetch(`${this.url}users/${partOfUrl}`, {
      method: "GET",
      credentials: "include",
      headers: this.headers,
    }).then((res) => this._checkStatus(res));
  };

  getArticles = ({ partOfUrl }) => {
    return fetch(`${this.url}${partOfUrl}`, {
      method: "GET",
      credentials: "include",
      headers: this.headers,
    }).then((res) => this._checkStatus(res));
  };

  saveArticle = ({
    partOfUrl,
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  }) => {
    return fetch(`${this.url}${partOfUrl}`, {
      method: "POST",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        keyword: keyword,
        title: title,
        text: text,
        date: date,
        source: source,
        link: link,
        image: image,
      }),
    }).then((res) => this._checkStatus(res));
  };

  removeArticle = ( {partOfUrl, cardID} ) => {
    return fetch(`${this._url}${partOfUrl}/${cardID}`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then((res) => this._checkStatus(res));
  }

  _checkStatus = (res) => {
    if (!res.ok) {
      return Promise.reject(res);
    } else {
      return res.json();
    }
  };
}
