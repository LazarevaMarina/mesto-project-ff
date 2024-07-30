export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// функция для поиска всех форм на странице для валидации
export function enableValidation()  {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// слушатель полей формы для валидации
export function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);}
      );
  });

};

// валидация всех форм
function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity("Разрешены только латинские и кирилические буквы, знаки дефиса и пробелы.");
} else {
  inputElement.setCustomValidity("");
}

  if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, validationConfig);
  } else {hideInputError(formElement, inputElement, validationConfig);}
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, validationConfig) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  formError.classList.add(validationConfig.errorClass);
  formError.textContent = inputElement.validationMessage;
  inputElement.classList.add(validationConfig.inputErrorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  formError.classList.remove(validationConfig.errorClass);
  formError.textContent = '';
};

// функция для проверки наличия не валидных полей в форме
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

// функция для активации/деактивации кнопки
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// функция oчистки валидации
export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, validationConfig)
  );
  toggleButtonState(inputList, buttonElement);
};