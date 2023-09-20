// Імпорт функцій fetchBreeds та fetchCatByBreed з модуля './cat-api'
import { fetchBreeds, fetchCatByBreed } from './cat-api';

// Встановлення печива з атрибутами SameSite та Secure
document.cookie = 'myCookie=myValue; SameSite=None; Secure';

// Отримання посилань на HTML-елементи з класами
const breedSelect = document.querySelector('.breed-select'); // Вибір породи кота
const loader = document.querySelector('.loader'); // Відображення завантажувача
const error = document.querySelector('.error'); // Відображення повідомлення про помилку
const catInfo = document.querySelector('.cat-info'); // Відображення інформації про кота

// Обробник події, що відбувається при завантаженні сторінки
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Відображення завантажувача під час завантаження списку порід
    loader.style.display = 'block';
    // Отримання списку порід з використанням функції fetchBreeds()
    const breeds = await fetchBreeds();
    // Приховання завантажувача після завершення завантаження
    loader.style.display = 'none';
    // Додавання опцій до вибірника порід
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (e) {
    // Приховання завантажувача та відображення повідомлення про помилку у разі помилки завантаження
    loader.style.display = 'none';
    error.style.display = 'block';
  }
});

// Обробник події, що відбувається при виборі породи кота з вибірника
breedSelect.addEventListener('change', async () => {
  const selectedBreedId = breedSelect.value;
  try {
    // Відображення завантажувача під час завантаження інформації про кота
    loader.style.display = 'block';
    // Отримання інформації про кота за обраною породою з використанням функції fetchCatByBreed()
    const [cat] = await fetchCatByBreed(selectedBreedId);
    // Приховання завантажувача після завершення завантаження
    loader.style.display = 'none';
    // Формування HTML-коду для відображення інформації про кота
    const catInfoHtml = `
      <h2>Порода: ${cat.breeds[0].name}</h2>
      <p>Опис породи: ${cat.breeds[0].description}</p>
      <p>Темперамент: ${cat.breeds[0].temperament}</p>
      <img src="${cat.url}" alt="Фото котика">
    `;
    // Відображення інформації про кота на сторінці
    catInfo.innerHTML = catInfoHtml;
  } catch (e) {
    // Приховання завантажувача, відображення повідомлення про помилку і очищення інформації про кота у разі помилки завантаження
    loader.style.display = 'none';
    error.style.display = 'block';
    catInfo.innerHTML = '';
  }
});
