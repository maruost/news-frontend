export default class NewsApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getCards = ({request, prevDate, currentDate, pageSize}) => {
    return fetch(
      `${this.url}` +
        `?q=${request}&` +
        `from=${prevDate}&` +
        `to=${currentDate}&` +
        `pageSize=${pageSize}`,
      {
        headers: this.headers,
      }
    ).then((res) => this._checkStatus(res));
  };

  _checkStatus = (res) => {
    if (!res.ok) {
      return Promise.reject(res.status);
    } else {
     return res.json();
    }
  };
}
