// функции добавления слушателей при открытом попапе
export function addEventListenerClose() {
    const popupActiv = document.querySelector('.popup_is-opened');
    const closePopupActiv = popupActiv.querySelector('.popup__close');

    document.addEventListener('keydown', closePopupEsc);
    closePopupActiv.addEventListener('click', () => { closePopup(popupActiv) });
    document.addEventListener('click', closePopupOverlay);
};

// функция закрытия попапа по esc
function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const popupActiv = document.querySelector('.popup_is-opened');
        closePopup(popupActiv);

    };
}

// функция закрытия по оверлею
function closePopupOverlay(evt) {
    if (evt.target.classList.value.includes('popup_type')) {
        const popupActiv = document.querySelector('.popup_is-opened');
        closePopup(popupActiv);
    };
}

// функция закрытия попапа и снятия слушателей
export function closePopup(popupActiv) {
    const closePopupActiv = popupActiv.querySelector('.popup__close');

    document.removeEventListener('keydown', addEventListenerClose);
    closePopupActiv.removeEventListener('click', addEventListenerClose);
    document.removeEventListener('click', addEventListenerClose);

    popupActiv.classList.remove('popup_is-opened');
}

// функция открытия попапа
export function openModal(element) {
    element.classList.add('popup_is-opened');
}
