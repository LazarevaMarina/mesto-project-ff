import { closeModal } from '../components/modal.js';


export function createCard(cardTemplate, element, deleteCard, ImagePopup, LikeAdd) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardElementImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');

    deleteButton.addEventListener('click', deleteCard);

    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;

    cardElementImage.addEventListener('click', () => {
        ImagePopup(element);
        closeModal();
    });

    likeButton.addEventListener('click', () => {
        LikeAdd(likeButton);
    });

    return cardElement;

};

export function deleteCard(evt) {
    const evtTarget = evt.target.closest('.places__item').remove();
};

export function LikeAdd(likeButton) {
    if (likeButton.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
    }
    else {
        likeButton.classList.add('card__like-button_is-active');
    }
}
