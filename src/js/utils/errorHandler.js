function errorHandler(err) {
  if (err === 401) {
    return console.log("Неправильные почта или пароль");
  }
  if (err === 404) {
    return console.log("Не найдено");
  }
  if (err === 409) {
    return console.log("Такой пользователь уже существует");
  }
  if (err === 500) {
    return console.log("С сервером что-то не так");
  }
  if (err === 403) {
    return console.log("Проверьте правильность заполнения полей");
  } else {
    console.log(err);
    return console.log("Что-то пошло не так");
  }
}

export { errorHandler };
