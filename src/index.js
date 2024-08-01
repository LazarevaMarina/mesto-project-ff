import './pages/index.css';
import { createCard } from '../src/components/card.js';
import { closePopup, openModal} from '../src/components/modal.js';
import { startValueFormProfile, handleFormSubmitProfile, addNewPlace, placeList, popupNewCard, formProfile, popupProfile, formNewPlace, containerMain } from './components/forms.js';
import { getUser, getCards, patchAvatar } from './api.js';
import { clearValidation, enableValidation} from './components/validation.js';

const addButton = containerMain.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card-template').content;
const profileEditButton = containerMain.querySelector('.profile__edit-button');
const inputPlaceNewCard = popupNewCard.querySelector('.popup__input_type_card-name');
const inputLinkNewCard = popupNewCard.querySelector('.popup__input_type_url');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarOverlay = document.querySelector('.profile__overlay');

const allPopups = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup_type_image');
const popupTitle = popupImage.querySelector('.popup__caption');
const imageCard = popupImage.querySelector('.popup__image');
const closePopupAll = document.querySelectorAll('.popup__close');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms["new-avatar"];
const inpurtAvatarProfile = formAvatar.querySelector('.popup__input_type_url');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


// добавления анимации на все попапы
allPopups.forEach(function (popup) {
    popup.classList.add('popup_is-animated');
});

// слушатель для открытия попапа с профайлом
profileEditButton.addEventListener('click', function (evt) {
    openModal(popupProfile);

    startValueFormProfile();

    clearValidation(popupProfile, validationConfig);
    }
);

// слушатель для открытия попапа для создания новой карточки
addButton.addEventListener('click', function (evt) {
    openModal(popupNewCard);

    inputPlaceNewCard.value = '';
    inputLinkNewCard.value = '';

    clearValidation(popupNewCard, validationConfig);
    }
);

// слушатель для редактирования профиля и отправки на сервер
formProfile.addEventListener('submit', handleFormSubmitProfile);

formNewPlace.addEventListener('submit', addNewPlace);

// слушатель, который весит на форме в попапе аватара  
formAvatar.addEventListener('submit', avatarFormSubmit); // слушатели сабмита не находятся в forms, они находятся здесь, только выше. не стала переносить.

// функция для открытия попапа с карточкой
export function openImagePopup(image) {
    imageCard.src = image.link;
    imageCard.alt = image.name;
    popupTitle.textContent = image.name;
    openModal(popupImage);
};

// слушатель закрытия попапа через крест
closePopupAll.forEach((element) => {
  const popup = element.closest('.popup');
  element.addEventListener("click", () => {
    closePopup(popup);
  });
});

enableValidation(validationConfig);

export let currentUser = "null";

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

// функция обновления аватара пользователя
const avatarFormSubmit = (evt) => {
    evt.preventDefault()
  
    const avatarValue = inpurtAvatarProfile.value;

    renderLoading(true, popupAvatar); 

    patchAvatar(avatarValue)
    .then((data) => {
      profileAvatar.src = data.avatar 
      closePopup(popupAvatar)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      renderLoading(false, popupAvatar);
    })
 };

// слушатель, который вестит на аватаре пользователя для его открытия
profileAvatarOverlay.addEventListener('click', () => {
    openModal(popupAvatar);
    clearValidation(popupAvatar, validationConfig);
  });

export const renderLoading = (isLoading, popupActiv) => {
    const activeButton = popupActiv.querySelector(".popup__button");
    if (isLoading) {
      activeButton.textContent = "Сохранение...";
    } else {
      activeButton.textContent = "Сохранить";
    }
  };
