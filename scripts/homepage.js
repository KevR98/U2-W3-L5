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
      console.log(sneakers); // Controllo sulla console l'array creato
      // Recupero la riga dove poi appenderò le carte
      const row = document.getElementById('row');
      sneakers.forEach((sneaker) => {
        row.innerHTML += `
        <div class="card" style="width: 18rem;">
          <img src="${sneaker.imageUrl}" class="card-img-top" alt="Image Sneaker">
          <div class="card-body">
            <h5 class="card-title">${sneaker.name}</h5>
            <p class="card-text">Brand: ${sneaker.brand}</p>
            <p class="card-text">Description: ${sneaker.description}.</p>
            <p class="card-text">Price: ${sneaker.price} €</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
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
