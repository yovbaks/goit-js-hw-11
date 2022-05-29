import { Notify } from 'notiflix';

const API_KEY = '27661968-fba717fb37b630c6286acce7d'
const BASE_URL = 'https://pixabay.com/api/'

    
export default class PixabeyService {
  constructor() {

    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.totalHits = null;

  }
  fetchImage() {
    
    const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;

    return fetch(URL)
      .then(response => response.json())
      .then(({ hits, totalHits }) => {
            
        this.incrementPage();
        this.totalHits = totalHits;
        
        return hits;
        
      });
  }
  showHits() {
    Notify.info(`We found ${this.totalHits}`);
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
}
