const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18/cards',
    headers: {
      authorization: 'a4dc7346-6d63-432d-8f25-26f0e5379654',
      'Content-Type': 'application/json'
    }
  };

// получить от сервера информацию о юзере
/*export const getUser = () => {
    fetch('https://nomoreparties.co/v1/:cohortId/users/me')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
          console.log(data.user);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
};*/

export const getUser = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me', {
        headers: config.headers
    })
    .then((res) => {console.log(res)})
};
