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
        <div class="col">
          <div class="card shadow p-3 mb-5 bg-body-dark">
            <img src="${sneaker.imageUrl}" class="card-img-top" alt="Image Sneaker">
            <div class="card-body d-flex flex-column">
              <h3 class="card-title my-2">${sneaker.name}</h3>
              <h5 class="card-text my-2">Brand: ${sneaker.brand}</h5>
              <p class="card-text my-3">Description: ${sneaker.description}.</p>
              <p class="card-text flex-grow-1">Price: ${sneaker.price} €</p>
              <div class="d-flex justify-content-around">
              <a href="../html/details.html?sneakerId=${sneaker._id}" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
              <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
              <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
              </svg></a>
                  <button onclick="editSneaker('${sneaker._id}')" class="btn btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                  </button>
            </div>
            </div>
          </div>
        </div>
        `;
      });
      // Cliccando edit mi porta alla pagina di edit
      window.editSneaker = function (id) {
        location.assign('/html/backoffice.html?sneakerId=' + id);
      };
    })
    // Esito Negativo
    .catch((err) => {
      console.log('ERRORE!', err);
    });
};

getProduct();

// Faccio il footer
const footer = function () {
  // per prima cosa, popolo il footer con l'anno corrente
  const span = document.getElementById('year');
  span.innerText = new Date().getFullYear(); // 2025
};

footer();
