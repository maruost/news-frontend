const configMainApi = {
  url: "https://api.my-news-explorer.gq/",

  headers: {
    "Content-Type": "application/json",
  },
};

const configNewsApi = {
  url:
    NODE_ENV === "production"
      ? "https://nomoreparties.co/news/v2/everything"
      : "https://newsapi.org/v2/everything",
};

export { configNewsApi, configMainApi };

// NODE_ENV === "production"
// ? "https://api.my-news-explorer.gq/"
// : "http://localhost:3000/",
