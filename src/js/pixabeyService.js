import { Notify } from 'notiflix';
import axios from 'axios';

const API_KEY = '27661968-fba717fb37b630c6286acce7d';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabeyService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.totalHits = null;
  }
  async fetchImage() {
    const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;

    const response = await axios.get(URL);

    if (this.page === 1 && response.data.totalHits !== 0) {
      Notify.info(`We found ${response.data.totalHits}`);
    this.incrementPage();
    }

    return response.data.hits;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
    this.totalHits = null;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  // showHits() {
  //   Notify.info(`We found ${response.data.totalHits}`);
  // }
}

// ------- fetch----------
// return fetch(URL)
//   .then(response => response.json())
//   .then(({ hits, totalHits }) => {
//     if (totalHits >= 1 && totalHits !== 0) {
//       this.incrementPage();
//       this.totalHits = totalHits;
//       // Notify.info(`We found ${this.totalHits}`);
//     }
//     return hits;
// });
