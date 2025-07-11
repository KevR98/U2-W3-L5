// Inizializzo L'API che mi serve per poterlo caricare con i prodotti salvati
const API = 'https://striveschool-api.herokuapp.com/api/product/';
const AUT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmFjMjc4Y2RkZjAwMTU1ZDY3OWMiLCJpYXQiOjE3NTIyMTgzMDYsImV4cCI6MTc1MzQyNzkwNn0.qIKWsVt-NyOujO__ZKNGCfnghbodxzDrQW6cp55KeZ8';

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
  fetch(API, {
    method: 'POST',
    body: JSON.stringify(saveSneaker),
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer' + AUT,
    },
  })
    .then((res) => {
      if (res.ok) {
        alert('OPERAZIONE COMPLETATA');
        sneakerForm.reset();
      } else {
        throw new Error("C'è un errore nella richiesta", res);
      }
    })

    .catch((err) => {
      alert('ERRORE!');
      console.log('ERRORE', err);
    });
});
