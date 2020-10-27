export default class MainApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  signup = ({ partOfUrl, email, password, name }) => {
    return fetch(`${this.url}${partOfUrl}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).then((res) => this._checkStatus(res));
  };

  _checkStatus = (res) => {
    if (!res.ok) {
      return Promise.reject(res);
    } else {
      return res.json();
    }
  };
}
