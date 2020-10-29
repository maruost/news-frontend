function isUserLogged() {
  let isLogged;
  localStorage.getItem("name") ? isLogged = true : isLogged = false;
  return isLogged;
}

export { isUserLogged };