// Inizializzo le costanti che mi servono
const API = 'https://striveschool-api.herokuapp.com/api/product/';
const AUT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmFjMjc4Y2RkZjAwMTU1ZDY3OWMiLCJpYXQiOjE3NTIyMTgzMDYsImV4cCI6MTc1MzQyNzkwNn0.qIKWsVt-NyOujO__ZKNGCfnghbodxzDrQW6cp55KeZ8';

// Effettuo la chiamata

const getProduct = function () {
  fetch(API, {
    headers: {
      Authorization: 'Bearer ' + AUT,
    },
  })
    .then((res) => {
      // Faccio il controllo dell'API
      if (res.ok) {
        // Esito positivo
        return res.json();
      } else {
        // Altrimenti eso negativo
        throw new Error('La chiamata non è andata a buon fine');
      }
    })
    // In caso di esito positivo continuo, inizializzando le carte create dal backoffice
    .then((sneakers) => {
      console.log('Array of Sneakers', sneakers); // Controllo sulla console l'array creato
      // Recupero la riga dove poi appenderò le carte
      const row = document.getElementById('row');
      sneakers.forEach((sneaker) => {
        row.innerHTML += `
        <div class="card">
          <img src="${sneaker.imageUrl}" class="card-img-top" alt="Image Sneaker">
          <div class="card-body">
            <h3 class="card-title">${sneaker.name}</h3>
            <h5 class="card-text">Brand: ${sneaker.brand}</h5>
            <p class="card-text">Description: ${sneaker.description}.</p>
            <p class="card-text">Price: ${sneaker.price} €</p>
            <a href="../html/details.html?sneakerId=${sneaker._id}" class="btn btn-success">Vai ai Dettagli</a>
          </div>
        </div>
        `;
      });
    })
    // Esito Negativo
    .catch((err) => {
      console.log('ERRORE!', err);
    });
};

getProduct();
