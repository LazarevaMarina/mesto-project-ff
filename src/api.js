import { data } from "autoprefixer";


// авторизация
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18/cards',
    headers: {
      authorization: 'a4dc7346-6d63-432d-8f25-26f0e5379654',
      'Content-Type': 'application/json'
    }
  };

// запрос на получение информации от сервера о юзере
export const getUser = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me', {
        headers: config.headers
    })
    .then((data) => {
      if(data.ok) {
      return data.json();}
      else {
        return Promise.reject(`Error: ${data.status}`);
      }
    })
    .then((user) => {
      return user;
    })
};

// запрос на получение карточек от сервера
export const getCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/cards', {
    headers: config.headers
  })
  .then((data) => {
    if(data.ok) {
    return data.json();}
    else {
      return Promise.reject(`Error: ${data.status}`);
    }
  })
  .then((cards) => {
    return cards;
  })
};

// запрос на добавление новой карточки на сервер
export const postNewCard = (name, link) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/cards', {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
  .then((data) => {
    if (data.ok) {
    return data.json();
  } 
  else {
    return Promise.reject(`Error: ${data.status}`);
  }})
};

// запрос на удаление карточки
export const deleteUserCard = function(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-18/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((data) => {
    if (data.ok) {
    return data.json();
  } 
  else {
    return Promise.reject(`Error: ${data.status}`);
  }})
};

// запрос для отправки на сервер отредактированных данных профеля
export const patchProfile = function(nameFemile, profession) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameFemile,
      about: profession
    })
  })
  .then((data) => {
    if (data.ok) {
    return data.json();
  } 
  else {
    return Promise.reject(`Error: ${data.status}`);
  }})
};

// запрос для добавления лайка у карточки
export const addLikeCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-18/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((data) => {
    if (data.ok) {
    return data.json();
  } 
  else {
    return Promise.reject(`Error: ${data.status}`);
  }})
};

// запрос для удаления лайка у карточки
export const removeLikeCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-18/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((data) => {
    if (data.ok) {
    return data.json();
  } 
  else {
    return Promise.reject(`Error: ${data.status}`);
  }})
};

// запрос для обновления аватара пользователя
export const patchAvatar = (avatarValue) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarValue
    })
  })
  .then((data) => {
    if (data.ok) {
    return data.json();
  } 
  else {
    return Promise.reject(`Error: ${data.status}`);
  }})
};
