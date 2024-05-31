// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container_main = document.querySelector('.content');
const addButton = container_main.querySelector('.profile__add-button');
const placesList = container_main.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardTemplate, element, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', deleteCard);

    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    
    return cardElement;
    
};

initialCards.forEach(function addCard(cardElement) {
    const element = createCard(cardTemplate, cardElement, deleteCard);
    placesList.append(element);
});

function deleteCard(evt) {
    const evtTarget = evt.target.closest('.places__item').remove();
};


