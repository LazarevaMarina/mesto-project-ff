import { userId, currentUser } from "../index";
import { addLikeCard, removeLikeCard } from "../api";

export function createCard(cardTemplate, element, openImagePopup, currentUser) { 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardElementImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardElementTitle = cardElement.querySelector('.card__title');
    const containerLike = cardElement.querySelector('.container_like');
    
    deleteButtonCard(deleteButton, element, currentUser, cardElement);

    cardElementImage.src =  element.link;
    cardElementImage.alt = element.name;
    cardElementTitle.textContent = element.name;
    
    const container = cardElement.querySelector('.container');

    const isLiked = element.likes.some((like) => like._id === currentUser);


    if (isLiked) {
        likeButton.classList.add("card__like-button_is-active");
    }
    container.textContent = element.likes.length;


    cardElementImage.addEventListener('click', () => {
        openImagePopup(element);
    });

    likeButton.addEventListener('click', () => {
        addRemoveLike(likeButton, element, cardElement);
    });

    return cardElement;

};

// навешивание слушателя для корзины/корзина появится только у карточек пользователя
function deleteButtonCard(deleteButton, element, currentUser, cardElement) {
    const cardOwnerId = element.owner._id;
    const cardId = element._id;

    if (currentUser===cardOwnerId) {
        deleteButton.setAttribute("style", "display: block;");
        deleteButton.addEventListener('click', () => {deleteCard(cardElement)});
    };
};

// функция для удаления карточек
export function deleteCard(cardElement) {
    cardElement.remove();
};

// Функция добавления/удаления лайка
export function addRemoveLike (likeButton, element, cardElement) {
    const cardId = element._id;
    const containerLike = cardElement.querySelector('.container');

   if (likeButton.classList.contains('card__like-button_is-active')) {
        removeLikeCard(cardId)
        .then((cardData) => {
            likeButton.classList.remove('card__like-button_is-active');
            const counterLike = cardData.likes.length;
            containerLike.textContent = counterLike;
        })
        
    }
    else {
        addLikeCard(cardId)
        .then((cardData) => {
            likeButton.classList.add('card__like-button_is-active');
            const counterLike = cardData.likes.length;
            containerLike.textContent = counterLike;
        })
    }
};
