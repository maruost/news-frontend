const configMainApi = {
  url:
    NODE_ENV === "production"
      ? "https://api.my-news-explorer.gq/"
      : "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
};

const configNewsApi = {
  url:
    NODE_ENV === "production"
      ? "https://nomoreparties.co/news/v2/everything"
      : "https://newsapi.org/v2/everything",
  headers: {
    authorization: "0c94ed05a1c74e599d2ccbf92efbc3dc",
  },
};

module.exports = {
  configNewsApi,
  configMainApi,
};
