// Inizializzo le costanti che mi servono
const API = 'https://striveschool-api.herokuapp.com/api/product/';
const AUT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmFjMjc4Y2RkZjAwMTU1ZDY3OWMiLCJpYXQiOjE3NTIyMTgzMDYsImV4cCI6MTc1MzQyNzkwNn0.qIKWsVt-NyOujO__ZKNGCfnghbodxzDrQW6cp55KeZ8';

// Dichiaro una variabile che al click del bottone dettagli mi riporta la carta che ho selezionato con il suo rispettivo _id
const url = new URLSearchParams(location.search); // Serve per recuperare l'id
// Trova l'id "6870e7ce78cddf00155d689c" cliccato nella pagina precedente e deve essere uguale a es:../html/details.html?sneakerId=6870e7ce78cddf00155d689c
const id = url.get('sneakerId');
// Controllo se c'è un ID
if (id) {
  console.log('Carico i dettagli del prodotto con ID:', id);
} else {
  console.log('Nessun ID trovato nella URL');
}

// Faccio la chiamata GET con l'url e aggiunge il suo ID
const detail = function () {
  fetch(API + '/' + id, {
    headers: {
      Authorization: 'Bearer ' + AUT,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("C'è stato un'errore nel caricamento");
      }
    })

    .then((sneakerDetail) => {
      // Stampo il dettaglio della scarpa selezionata
      console.log('Dettagli', sneakerDetail);
      // Inserisco i dati della scarpa alla card
      document.querySelector('.card-img-top').src = sneakerDetail.imageUrl;
      document.getElementById('name').innerText = sneakerDetail.name;
      document.getElementById('brand').innerText = sneakerDetail.brand;
      document.getElementById('description').innerText =
        sneakerDetail.description + '.';
      document.getElementById('price').innerText = sneakerDetail.price + '€';
    })

    .catch((err) => {
      console.log('ERRORE!');
    });
};

const backHomeSneaker = function () {
  location.assign('/html/homepage.html');
};

// Faccio una funzione
const deleteSneaker = function () {
  // Faccio la chiamata con metodo "DELETE" e autorizzazione per poterla cancellare
  fetch(API + '/' + id, {
    headers: {
      Authorization: 'Bearer ' + AUT,
    },
    method: 'DELETE',
  })
    .then((res) => {
      if (res.ok) {
        alert('ELIMINAZIONE DELLA SNEAKER AVVENUTA CON SUCCESSO');
        location.assign('/html/homepage.html');
      } else {
        throw new Error('ERRORE!');
      }
    })

    .catch((err) => {
      console.log('Errore nel caricamento', err);
    });
};

detail();

// Faccio il footer
const footer = function () {
  // per prima cosa, popolo il footer con l'anno corrente
  const span = document.getElementById('year');
  span.innerText = new Date().getFullYear(); // 2025
};

footer();
