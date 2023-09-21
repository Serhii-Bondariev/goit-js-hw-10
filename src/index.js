import '../src/index.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Отримання посилань на HTML-елементи з класами
const select = document.querySelector('.breed-select'); // Вибір породи кота
const loading = document.querySelector('.loader'); // Відображення завантажувача
const error = document.querySelector('.error'); // Відображення помилки
const catCard = document.querySelector('.cat-info'); // Відображення catInfo

// Приховання елементів при завантаженні сторінки
loading.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
catCard.classList.add('is-hidden');

// Налаштування відображення завантажувача
Loading.dots({
  svgColor: '#5897fb',
  svgSize: '130px',
  messageFontSize: '35px',
});

// Отримання та відображення списку порід котів
fetchBreeds()
  .then(data => {
    select.classList.add('breed-select');
    loading.classList.replace('loader', 'is-hidden');
    select.insertAdjacentHTML('beforeend', createMarkupOptions(data));
    new SlimSelect({
      select: select,
      settings: {
        placeholderText: 'Select a cat',
      },
    });
  })
  .catch(err => {
    Notify.failure(error.textContent);
  })
  .finally(result => Loading.remove());

// Функція для створення HTML-коду опцій вибірника
function createMarkupOptions(arr) {
  return arr
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join('');
}

// Обробник події при виборі породи кота
select.addEventListener('change', e => {
  const id = e.target.value;

  // Налаштування відображення завантажувача
  Loading.dots({
    svgColor: '#fafafa',
    svgSize: '130px',
    messageFontSize: '30px',
  });

  // Отримання та відображення інформації про кота
  fetchCatByBreed(id)
    .then(catInfo => {
      catCard.classList.replace(`is-hidden`, 'cat-info');
      createMarkupCards(catInfo);
    })
    .catch(err => {
      catCard.classList.add(`is-hidden`);
      Notify.failure(error.textContent);
    })
    .finally(result => Loading.remove());
});

// Функція для створення HTML-коду для інформації про кота
function createMarkupCards(data) {
  const {
    breeds: [{ name, description, temperament }],
    url,
  } = data;

  const card = ` 
        <img class="cat-img" src="${url}" alt="${name}"  >
         <div class="cat-right">
        <h1 class="name">${name}</h1>
        <p class="description">${description}</p>
        <p class="temperament"><span class="temperament-span">Temperament:</span> ${temperament}</p>    
        </div>`;
  catCard.innerHTML = card;
}
