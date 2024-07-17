import './pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, addLike } from '../src/components/card.js';
import { closePopup, openModal} from '../src/components/modal.js';
import { startValueFormProfile, handleFormSubmitProfile, addNewPlace } from './components/forms.js';


const containerMain = document.querySelector('.content');
const addButton = containerMain.querySelector('.profile__add-button');
export const placesList = containerMain.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const profileEditButton = containerMain.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
const inputPlaceNewCard = popupNewCard.querySelector('.popup__input_type_card-name');
const inputLinkNewCard = popupNewCard.querySelector('.popup__input_type_url');

const allPopups = document.querySelectorAll('.popup');

export const formProfile = document.forms["edit-profile"];
export const formNewPlace = document.forms["new-place"];

export const containerPage = document.querySelector('.page');
export const popupImage = document.querySelector('.popup_type_image');
const popupTitle = popupImage.querySelector('.popup__caption');
const imageCard = popupImage.querySelector('.popup__image');
const closePopupAll = document.querySelectorAll('.popup__close');


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

    startValueFormProfile();
}
);

// слушатель для открытия попапа для создания новой карточки
addButton.addEventListener('click', function (evt) {
    openModal(popupNewCard);

    inputPlaceNewCard.value = '';
    inputLinkNewCard.value = '';
});

// слушатель для редактирования профиля и отправки на сервер
formProfile.addEventListener('submit', handleFormSubmitProfile);

formNewPlace.addEventListener('submit', addNewPlace);

// функция для открытия попапа с карточкой
export function openImagePopup(image) {
    imageCard.src = image.link;
    imageCard.alt = image.name;
    popupTitle.textContent = image.name;
    openModal(popupImage);
};

// слушатель закрытия попапа через крест
closePopupAll.forEach((element) => {
    element.addEventListener('click', () => { 
        const popupActiv = document.querySelector('.popup_is-opened');
        closePopup(popupActiv) });
});



const formInput = formProfile.querySelector('.popup__input');

// слушатель полей формы для валидации
formInput.addEventListener('input', isValid);

// валидация всех форм
function isValid() {
    if(!formInput.validity.valid) {
        showInputError(formInput);
    } else {hideInputError(formInput);}
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (element) => {
    element.classList.add('form__input_type_error');
    console.log(3333);
  };

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
    element.classList.remove('form__input_type_error');
    console.log(4444);
  };
