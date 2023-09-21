import axios from 'axios';
// URL для звернень до API
const URL = 'https://api.thecatapi.com/v1/';
// Ключ доступу до API
const API_KEY =
  'live_jOiK6MzSYJAkw5eKvKfoj7M38hZlknKIiM4zLPt62UhBJwaibwvvrpsMn32nvbtd';
// Встановлення базового URL для axios
axios.defaults.baseURL = URL;
// Встановлення ключа доступу для всіх запитів
axios.defaults.headers.common['x-api-key'] = API_KEY;
// Функція для отримання списку порід котів
export function fetchBreeds() {
  const BREEDS_URL = 'breeds';
  return axios.get(BREEDS_URL).then(res => {
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    return res.data;
  });
}
// Функція для отримання інформації про кота за ідентифікатором породи
export function fetchCatByBreed(breedId) {
  const IMAGES_URL = 'images/search';
  const params = new URLSearchParams({
    breed_ids: breedId,
  });
  return axios.get(`${IMAGES_URL}?${params}`).then(res => {
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    return res.data[0];
  });
}
