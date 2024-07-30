import './pages/index.css';
import { createCard, deleteCard, addRemoveLike } from '../src/components/card.js';
import { closePopup, openModal} from '../src/components/modal.js';
import { startValueFormProfile, handleFormSubmitProfile, addNewPlace } from './components/forms.js';
import { getUser, getCards, addLikeCard, patchAvatar } from './api.js';
import { setEventListeners } from './components/validation.js';

const containerMain = document.querySelector('.content');
const addButton = containerMain.querySelector('.profile__add-button');
export const placesList = containerMain.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const profileEditButton = containerMain.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
const inputPlaceNewCard = popupNewCard.querySelector('.popup__input_type_card-name');
const inputLinkNewCard = popupNewCard.querySelector('.popup__input_type_url');

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarOverlay = document.querySelector('.profile__overlay');
const placeList = document.querySelector('.places__list');

const allPopups = document.querySelectorAll('.popup');

export const formProfile = document.forms["edit-profile"];
export const formNewPlace = document.forms["new-place"];



export const containerPage = document.querySelector('.page');
export const popupImage = document.querySelector('.popup_type_image');
const popupTitle = popupImage.querySelector('.popup__caption');
const imageCard = popupImage.querySelector('.popup__image');
const closePopupAll = document.querySelectorAll('.popup__close');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms["new-avatar"];
const inpurtAvatarProfile = formAvatar.querySelector('.popup__input_type_url');
const formPopupNewCard = popupNewCard.querySelector('.popup__form');


export let currentUser = "null";


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
    }
);

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

// функция для поиска всех форм на странице
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    formList.forEach((formElement) => {
      /*evt.preventDefault();*/
      setEventListeners(formElement);
    });
  };

enableValidation();

// слушатель полей формы для валидации
/*const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => (isValid(formElement, inputElement)));
    })

}*/


// валидация всех форм
function isValid(formElement, inputElement) {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement);
    } else {hideInputError(formElement. inputElement);}
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement) => {
    const formError = formProfile.querySelector('.form__input-error');

    inputElement.classList.add('popup__input_type_error');
    formError.classList.add('popup__error_visible');
    formError.textContent = 'Привет!';
  };

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const formError = formProfile.querySelector('.form__input-error');

    inputElement.classList.remove('popup__input_type_error');
    formError.classList.remove('popup__error_visible');
    formError.textContent = '';
  };

// получение пользователя/карточки
Promise.all(([getUser(), getCards()]))
  .then(([user, cards]) => {
    handlingUser(user);
    currentUser = user._id;
    cards.forEach((card) => {
      placeList.append(createCard(cardTemplate, card, openImagePopup, currentUser))
    })
    return user;
    })
    .catch((error) => {
    console.log(error)
  });

// функция выведения данных пользователя на страницу
const handlingUser = (user) => {
    const userName = user.name;
    const userProfession = user.about;
    const userAvatarLink = user.avatar;
    
    profileTitle.textContent = userName;
    profileDesc.textContent = userProfession;
    profileAvatar.src = userAvatarLink;
  };

// функция открытия попапа по клику на картинку
const openPopupImage = (name, link) => {
    const popupTypeImage = document.querySelector('.popup_type_image')
    const popupImage = popupTypeImage.querySelector('.popup__image')
    const popupCaption = popupTypeImage.querySelector('.popup__caption')
  
    popupImage.src = link
    popupImage.alt = name
    popupCaption.textContent = name
  
    openPopup(popupTypeImage)
  };

// функция обновления аватара пользователя
const avatarFormSubmit = (evt) => {
    evt.preventDefault()

    const formButton = formAvatar.querySelector('.popup__button');
    const popupActiv = document.querySelector('.popup_is-opened');
  
    const avatarValue = inpurtAvatarProfile.value;

    renderLoading(true, popupActiv); 

    patchAvatar(avatarValue)
    .then((data) => {
      profileAvatar.src = data.avatar 
      closePopup(popupAvatar)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      renderLoading(false, popupActiv);
    })
 };

// слушатель, который весит на форме в попапе аватара  
formAvatar.addEventListener('submit', avatarFormSubmit);

// слушатель, который вестит на аватаре пользователя для его открытия
profileAvatarOverlay.addEventListener('click', () => openModal(popupAvatar));


export const renderLoading = (isLoading, popupActiv) => {
    const activeButton = popupActiv.querySelector(".popup__button");
    if (isLoading) {
      activeButton.textContent = "Сохранение...";
    } else {
      activeButton.textContent = "Сохранить";
    }
  };
