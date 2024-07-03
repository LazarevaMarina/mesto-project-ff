import { ClosePopup, ImagePopup } from '../components/modal';
import { createCard, deleteCard } from './card';
import { placesList } from '../index';

const formProfile = document.forms["edit-profile"];
const nameFamily = formProfile.elements.name;
const profession = formProfile.elements.description;

const cardTemplate = document.querySelector('#card-template').content;

const userName = document.querySelector('.profile__title');
const userProfession = document.querySelector('.profile__description');


// функция для установки начальных значений в форме профайла
export function FormValueProfileStart() {
    nameFamily.value = userName.textContent;
    profession.value = userProfession.textContent;
}

// функция редактирования профиля
export function handleFormSubmit(evt) {
    evt.preventDefault();

    userName.textContent = nameFamily.value;
    userProfession.textContent = profession.value;

    const del = document.querySelector('.popup_is-opened');
    ClosePopup(del);
}

//функция добавления карточки
export function addNewPlace(evt) {
    evt.preventDefault();

    const formNewPlace = document.forms["new-place"];

    const placeName = formNewPlace.elements["place-name"];
    const placeLink = formNewPlace.elements.link;

    const element = {
        name: placeName.value,
        link: placeLink.value
    };

    const newElement = createCard(cardTemplate, element, deleteCard, ImagePopup);
    placesList.prepend(newElement);


    const del = document.querySelector('.popup_is-opened');
    ClosePopup(del);
}
