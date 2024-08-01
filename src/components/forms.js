import { closePopup } from "../components/modal";
import { createCard, deleteCard } from "./card";
import { openImagePopup, currentUser, renderLoading } from "../index.js";
import { patchProfile, postNewCard } from "../api.js";

export const containerMain = document.querySelector(".content");
export const placeList = document.querySelector(".places__list");
export const popupProfile = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const formProfile = document.forms["edit-profile"];
export const formNewPlace = document.forms["new-place"];

const nameFamily = formProfile.elements.name;
const profession = formProfile.elements.description;

const cardTemplate = document.querySelector("#card-template").content;

const userName = document.querySelector(".profile__title");
const userProfession = document.querySelector(".profile__description");

// функция для установки начальных значений в форме профайла
export function startValueFormProfile() {
  nameFamily.value = userName.textContent;
  profession.value = userProfession.textContent;
}

// функция редактирования профиля
export function handleFormSubmitProfile(evt) {
  evt.preventDefault();

  renderLoading(true, popupProfile);

  patchProfile(nameFamily.value, profession.value)
    .then((data) => {
      userName.textContent = nameFamily.value;
      userProfession.textContent = profession.value;
      closePopup(popupProfile);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, popupProfile);
    });
}

//функция добавления карточки
export function addNewPlace(evt) {
  evt.preventDefault();

  const placeName = formNewPlace.elements["place-name"];
  const placeLink = formNewPlace.elements.link;

  const element = {
    name: placeName.value,
    link: placeLink.value,
  };

  renderLoading(true, popupNewCard);

  postNewCard(element.name, element.link)
    .then((res) => {
      const newElement = createCard(
        cardTemplate,
        res,
        openImagePopup,
        currentUser
      );
      placeList.prepend(newElement);
      closePopup(popupNewCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, popupNewCard);
    });
}
