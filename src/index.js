import './sass/main.scss';
import PixabeyService from './js/pixabeyService';
// import articlesTpl from './templates/articles.hbs';
import { Notify } from 'notiflix';
import LoadMoreBtn from './js/loadMore';
import renderGallery from './js/renderImages';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.js-gallery-container'),
};

const apiService = new PixabeyService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const gallery = new SimpleLightbox('.gallery__link', {});


refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;

  if (apiService.query === '') {
    return Notify.failure('Enter some text');
  }
 

  loadMoreBtn.show();

  apiService.resetPage();
  clearGalleryMarkup();
  fetchImages();
}

function fetchImages() {

  loadMoreBtn.disable();

  apiService.fetchImage().then(images => {
    if (images.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.hide();
    }

    const markup = renderGallery(images);
    refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
    
    gallery.refresh();
    loadMoreBtn.enable();
    scroll();
    
  });
}

function clearGalleryMarkup() {
  refs.galleryContainer.innerHTML = '';
}

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 0.5,
    behavior: 'smooth',
  });
}
