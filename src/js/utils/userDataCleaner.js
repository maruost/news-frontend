function userDataCleaner() {
  document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  location.reload();
}

export { userDataCleaner };
