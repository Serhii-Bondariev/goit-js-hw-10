// cat-api.js

import axios from 'axios';

// Встановлення ключа доступу
axios.defaults.headers.common['x-api-key'] =
  'live_jOiK6MzSYJAkw5eKvKfoj7M38hZlknKIiM4zLPt62UhBJwaibwvvrpsMn32nvbtd';

// Функція для отримання списку порід
export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Функція для отримання інформації про кота за ідентифікатором породи
export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
