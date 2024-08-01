import { data } from "autoprefixer";
import { checkResponse } from "./utils/utils";

// авторизация
const config = {
  baseUrl: `https://nomoreparties.co/v1/wff-cohort-18/`,
  headers: {
    authorization: "a4dc7346-6d63-432d-8f25-26f0e5379654",
    "Content-Type": "application/json",
  },
};

// запрос на получение информации от сервера о юзере
export const getUser = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
  })
    .then((data) => {
      if (data.ok) {
        return data.json();
      } else {
        return Promise.reject(`Error: ${data.status}`);
      }
    })
    .then((user) => {
      return user;
    });
};

// запрос на получение карточек от сервера
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((data) => {
      if (data.ok) {
        return data.json();
      } else {
        return Promise.reject(`Error: ${data.status}`);
      }
    })
    .then((cards) => {
      return cards;
    });
};

// запрос на добавление новой карточки на сервер
export const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
};

// запрос на удаление карточки
export const deleteUserCard = function (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// запрос для отправки на сервер отредактированных данных профеля
export const patchProfile = function (nameFemile, profession) {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameFemile,
      about: profession,
    }),
  }).then(checkResponse);
};

// запрос для добавления лайка у карточки
export const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

// запрос для удаления лайка у карточки
export const removeLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// запрос для обновления аватара пользователя
export const patchAvatar = (avatarValue) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarValue,
    }),
  }).then(checkResponse);
};
