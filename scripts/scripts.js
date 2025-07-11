// Inizializzo le costanti che mi servono
const API = 'https://striveschool-api.herokuapp.com/api/product/';
const AUT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmFjMjc4Y2RkZjAwMTU1ZDY3OWMiLCJpYXQiOjE3NTIyMTgzMDYsImV4cCI6MTc1MzQyNzkwNn0.qIKWsVt-NyOujO__ZKNGCfnghbodxzDrQW6cp55KeZ8';

// Effettuo la chiamata

const getProduct = function () {
  fetch(API, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmFjMjc4Y2RkZjAwMTU1ZDY3OWMiLCJpYXQiOjE3NTIyMTgzMDYsImV4cCI6MTc1MzQyNzkwNn0.qIKWsVt-NyOujO__ZKNGCfnghbodxzDrQW6cp55KeZ8',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('La chiamata non è andata a buon fine');
      }
    })
    .catch((err) => {
      console.log('ERRORE!', err);
    });
};

getProduct();
