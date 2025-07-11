// Inizializzo L'API che mi serve per poterlo caricare con i prodotti salvati e tutti le const/let che mi servono
const API = 'https://striveschool-api.herokuapp.com/api/product/';
const AUT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmFjMjc4Y2RkZjAwMTU1ZDY3OWMiLCJpYXQiOjE3NTIyMTgzMDYsImV4cCI6MTc1MzQyNzkwNn0.qIKWsVt-NyOujO__ZKNGCfnghbodxzDrQW6cp55KeZ8';

const url = new URLSearchParams(location.search);
const id = url.get('sneakerId');

let nuovoAPI;
let methods;

// Facciamo un controllo se c'è l'id nell'url = true
if (id) {
  // il nuovo url diventa API + id selezionato nella vecchia pagina
  nuovoAPI = API + '/' + id;
} else {
  // Nel caso contrario, prende il vecchio API e vuol dire che non ha cliccato nessuna card
  nuovoAPI = API;
}

// Rifaccio un controllo se c'è l'id nell'url = true
if (id) {
  // Nel caso ci fosse allora aggiunge le modifiche fatte alla carta solezionata
  methods = 'PUT';
} else {
  // Altrimenti crea una nuova "card"
  methods = 'POST';
}

// Per prima cosa ho bisogno che il prodotto abbia:
// - name;
// - description;
// - brand;
// - imageUrl;
// - price;

// Creo la classe con le relative istanze
class Sneakers {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

// Salvo i dati del form

// Richiamo il bototne con il suo rispettivo id
const sneakerForm = document.getElementById('sneakerForm');
// Creo un'evento al click del bottone
sneakerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Recupero tutti i riferimenti del form
  const nameInput = document.getElementById('name');
  const descriptionInput = document.getElementById('description');
  const brandInput = document.getElementById('brand');
  const imageUrlInput = document.getElementById('imageUrl');
  const priceInput = document.getElementById('price');

  // Creo una costante con i dati della classe creata precedentemente con i  valori inseriti nel form
  const saveSneaker = new Sneakers(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imageUrlInput.value,
    priceInput.value
  );

  // Faccio la chiamata API per salvare i dati
  fetch(nuovoAPI, {
    // Al posto di mettere method: "POST" ho salvato in questa variabile i dati di post e pu in base a dove si trova il cliente
    method: methods,
    body: JSON.stringify(saveSneaker),
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + AUT,
    },
  })
    .then((res) => {
      if (res.ok) {
        alert('OPERAZIONE COMPLETATA');
        sneakerForm.reset();
        location.href = '/html/backoffice.html';
      } else {
        throw new Error("C'è un errore nella richiesta", res);
      }
    })

    .catch((err) => {
      alert('ERRORE! LA CARTA È ESISTENTE');
      console.log('ERRORE LA CARTA È ESISTENTE', err);
    });
});

// Una volta cliccato il bottone Modifica ci porta nella pagina backoffice HTML e dovremmo salvare i dati della card per poterlo modifica a nostro piacimento.

if (id) {
  fetch(API + '/' + id, {
    headers: {
      Authorization: 'Bearer ' + AUT,
    },
  })
    // Rifaccio il controllo della chiamata
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('ERRORE NEL RECUPERO DEL SNEAKER SELEZIONATA!');
      }
    })

    // Se esito positivo richiamo i valori selezionati.
    .then((sneaker) => {
      console.log(sneaker);
      document.getElementById('name').value = sneaker.name;
      document.getElementById('description').value = sneaker.description;
      document.getElementById('brand').value = sneaker.brand;
      document.getElementById('imageUrl').value = sneaker.imageUrl;
      document.getElementById('price').value = sneaker.price;
    })

    .catch((err) => {
      console.log('ERRORE');
    });
}
