import './sass/main.scss';
import PixabeyService from './js/pixabeyService';
// import articlesTpl from './templates/articles.hbs';
import { Notify } from 'notiflix';
import LoadMoreBtn from './js/loadMore';
import renderGallery from './js/renderImages';

const refs = {
  searchForm: document.querySelector('.search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
};

const apiService = new PixabeyService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

apiService.fetchImage().then(images => {
  console.log(images);
});

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
  clearArticlesMarkup();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  apiService.fetchImage().then(images => {
    if (images.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    const markup = renderGallery(images);
    refs.articlesContainer.insertAdjacentHTML('beforeend', markup);
    loadMoreBtn.enable();
  });
}
// const markup = renderGallery();
// function appendArticlesMarkup(articles) {

//   refs.articlesContainer.insertAdjacentHTML('beforeend', markup);
// }

function clearArticlesMarkup() {
  refs.articlesContainer.innerHTML = '';
}
