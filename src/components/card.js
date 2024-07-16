export function createCard(cardTemplate, element, deleteCard, openImagePopup, addLike) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardElementImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardElementTitle = cardElement.querySelector('.card__title');

    deleteButton.addEventListener('click', deleteCard);

    cardElementImage.src =  element.link;
    cardElementImage.alt = element.name;
    cardElementTitle.textContent = element.name;

    cardElementImage.addEventListener('click', () => {
        openImagePopup(element);
    });

    likeButton.addEventListener('click', () => {
        addLike(likeButton);
    });

    return cardElement;

};

export function deleteCard(evt) {
    const evtTarget = evt.target.closest('.places__item').remove();
};

export function addLike(likeButton) {
    if (likeButton.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
    }
    else {
        likeButton.classList.add('card__like-button_is-active');
    }
}

