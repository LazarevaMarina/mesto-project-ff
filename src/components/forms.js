import { closePopup } from '../components/modal';
import { createCard, deleteCard} from './card';
import { placesList, openImagePopup, popupProfile, popupNewCard, currentUser, renderLoading} from '../index.js';
import { patchProfile, postNewCard } from '../api.js';

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
    const popupActiv = document.querySelector('.popup_is-opened');
    console.log(popupActiv)

    patchProfile(nameFamily.value, profession.value)
    .then((data) =>{
        userName.textContent = nameFamily.value;
        userProfession.textContent = profession.value;
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        renderLoading(false, popupActiv);
    })


    /*userName.textContent = nameFamily.value;
    userProfession.textContent = profession.value;*/

    closePopup(popupProfile);
};

//функция добавления карточки
export function addNewPlace(evt) {
    evt.preventDefault();
    const popupActiv = document.querySelector('.popup_is-opened');

    const placeName = formNewPlace.elements["place-name"];
    const placeLink = formNewPlace.elements.link;

    const element = {
        name: placeName.value,
        link: placeLink.value
    };

    postNewCard(element.name, element.link)
    .then((res) => {
        const newElement = createCard(cardTemplate, res, openImagePopup, currentUser);
        placesList.prepend(newElement);
    })  
    .finally(() => {
        renderLoading(false, popupActiv);
    })

    closePopup(popupNewCard);
};