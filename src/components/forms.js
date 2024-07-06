import { closePopup } from '../components/modal';
import { createCard, deleteCard, addLike } from './card';
import { placesList, openImagePopup, popupProfile, popupNewCard} from '../index.js';

const formProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];

const nameFamily = formProfile.elements.name;
const profession = formProfile.elements.description;

const cardTemplate = document.querySelector('#card-template').content;

const userName = document.querySelector('.profile__title');
const userProfession = document.querySelector('.profile__description');


// функция для установки начальных значений в форме профайла
export function startValueFormProfile() {
    nameFamily.value = userName.textContent;
    profession.value = userProfession.textContent;
}

// функция редактирования профиля
export function handleFormSubmitProfile(evt) {
    evt.preventDefault();

    userName.textContent = nameFamily.value;
    userProfession.textContent = profession.value;

    closePopup(popupProfile);
}

//функция добавления карточки
export function addNewPlace(evt) {
    evt.preventDefault();

    const placeName = formNewPlace.elements["place-name"];
    const placeLink = formNewPlace.elements.link;

    const element = {
        name: placeName.value,
        link: placeLink.value
    };

    const newElement = createCard(cardTemplate, element, deleteCard, openImagePopup, addLike);
    placesList.prepend(newElement);

    closePopup( popupNewCard);
}
