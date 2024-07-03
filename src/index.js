
import './pages/index.css';
import { initialCards } from '../scripts/cards.js';
import { createCard, deleteCard, LikeAdd } from '../src/components/card.js';
import { closeModal, ImagePopup, openModal } from '../src/components/modal.js';
import { FormValueProfileStart, handleFormSubmit, addNewPlace } from './components/forms.js';


const container_main = document.querySelector('.content');
const addButton = container_main.querySelector('.profile__add-button');
export const placesList = container_main.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const profileEditButton = container_main.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const allPopups = document.querySelectorAll('.popup');

export const formProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];

export const container_page = document.querySelector('.page');
export const popupImage = document.querySelector('.popup_type_image');
export const popupTitle = popupImage.querySelector('.popup__caption');
export const Image = popupImage.querySelector('.popup__image');


// перебор и выведение карточек
initialCards.forEach(function addCard(cardElement) {
    const element = createCard(cardTemplate, cardElement, deleteCard, ImagePopup, LikeAdd);
    placesList.append(element);
});

// добавления анимации на все попапы
allPopups.forEach(function (popup) {
    popup.classList.add('popup_is-animated');
});

// слушатель для открытия попапа с профайлом
profileEditButton.addEventListener('click', function (evt) {
    openModal(popupProfile);
    closeModal();
    FormValueProfileStart();
}
);

// слушатель для открытия попапа для создания новой карточки
addButton.addEventListener('click', function (evt) {
    openModal(popupNewCard);
    closeModal();
});

// слушатель для редактирования профиля и отправки на сервер
formProfile.addEventListener('submit', handleFormSubmit);

formNewPlace.addEventListener('submit', addNewPlace);
