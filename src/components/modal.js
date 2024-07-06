// функция закрытия попапа по esc
function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const popupActiv = document.querySelector('.popup_is-opened');
        closePopup(popupActiv);

    };
};

// функция закрытия по оверлею
function closePopupOverlay(evt) {
    if (evt.target.classList.value.includes('popup_type')) {
        const popupActiv = document.querySelector('.popup_is-opened');
        closePopup(popupActiv);
    };
};

// функция закрытия попапа и снятия слушателей
export function closePopup(popupActiv) {
    document.removeEventListener('keydown', openModal);
    document.removeEventListener('click', openModal);

    popupActiv.classList.remove('popup_is-opened');
};

// функция открытия попапа
export function openModal(element) {
    element.classList.add('popup_is-opened');

    document.addEventListener('keydown', closePopupEsc);
    document.addEventListener('click', closePopupOverlay);
};
