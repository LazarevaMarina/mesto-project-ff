import { container_page, popupImage, popupTitle, Image } from '../index';

// функции добавления слушателей при открытом попапе
export function closeModal() {
    const popupActiv = document.querySelector('.popup_is-opened');
    const closePopupActiv = popupActiv.querySelector('.popup__close');

    document.addEventListener('keydown', ClosePopupEsc);

    closePopupActiv.addEventListener('click', ClosePopupButton);

    document.addEventListener('click', ClosePopupOverlay);
};

// функция закрытия попапа по esc
function ClosePopupEsc(evt) {
    if (evt.key === "Escape") {
        ClosePopupButton(evt)
    };
}

// функция для закрытия попапа через крест
function ClosePopupButton(evt) {
    const del = container_page.querySelector('.popup_is-opened');
    removeEventListenerPopup();
    ClosePopup(del);
}

// функция закрытия по оверлею
function ClosePopupOverlay(evt) {
    if (evt.target.classList.value.includes('popup_type')) {
        ClosePopupButton(evt)
    };
}

// функия закрытия попапа
export function ClosePopup(del) {
    del.classList.remove('popup_is-opened')
}

// функция для удаления слушателей
export function removeEventListenerPopup() {
    const popupActiv = document.querySelector('.popup_is-opened');
    const closePopupActiv = popupActiv.querySelector('.popup__close');

    container_page.removeEventListener('keydown', closeModal);
    closePopupActiv.removeEventListener('click', closeModal);
    container_page.removeEventListener('click', closeModal);
};

// функция для открытия попапа с карточкой
export function ImagePopup(image) {
    Image.src = image.link;
    Image.alt = image.name;
    popupTitle.textContent = image.name;
    popupImage.classList.add('popup_is-opened');

}

// функция открытия попапа
export function openModal(element) {
    element.classList.add('popup_is-opened');
}
