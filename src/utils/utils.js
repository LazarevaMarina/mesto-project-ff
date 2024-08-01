// функция для проверки данных
export const checkResponse = (data) => {
    if (data.ok) {
      return data.json();
    } 
    else {
      return Promise.reject(`Error: ${data.status}`);
    }
  };