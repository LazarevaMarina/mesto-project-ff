
import './pages/index.css';
import { initialCards } from '../scripts/cards.js';
import { createCard, deleteCard, addLike } from '../src/components/card.js';
import { openModal, addEventListenerClose } from '../src/components/modal.js';
import { startFormValueProfile, handleFormSubmitProfile, addNewPlace } from './components/forms.js';


const containerMain = document.querySelector('.content');
const addButton = containerMain.querySelector('.profile__add-button');
export const placesList = containerMain.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const profileEditButton = containerMain.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
const allPopups = document.querySelectorAll('.popup');

export const formProfile = document.forms["edit-profile"];
export const formNewPlace = document.forms["new-place"];

export const containerPage = document.querySelector('.page');
export const popupImage = document.querySelector('.popup_type_image');
const popupTitle = popupImage.querySelector('.popup__caption');
const imageCard = popupImage.querySelector('.popup__image');


// перебор и выведение карточек
initialCards.forEach(function addCard(cardElement) {
    const element = createCard(cardTemplate, cardElement, deleteCard, openImagePopup, addLike);
    placesList.append(element);
});

// добавления анимации на все попапы
allPopups.forEach(function (popup) {
    popup.classList.add('popup_is-animated');
});

// слушатель для открытия попапа с профайлом
profileEditButton.addEventListener('click', function (evt) {
    openModal(popupProfile);
    addEventListenerClose();
    startFormValueProfile();
}
);

// слушатель для открытия попапа для создания новой карточки
addButton.addEventListener('click', function (evt) {
    openModal(popupNewCard);
    addEventListenerClose;
});

// слушатель для редактирования профиля и отправки на сервер
formProfile.addEventListener('submit', handleFormSubmitProfile);

formNewPlace.addEventListener('submit', addNewPlace);

// функция для открытия попапа с карточкой
export function openImagePopup(image) {
    imageCard.src = image.link;
    imageCard.alt = image.name;
    popupTitle.textContent = image.name;
    popupImage.classList.add('popup_is-opened');

};