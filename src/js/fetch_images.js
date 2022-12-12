import axios from 'axios';
import Notiflix from 'notiflix';

const getMoreButtonRef = document.querySelector('.load-more');
const BASE_URL =
  'https://pixabay.com/api/?key=32008820-29a82a4a3d033faa63b9c6371';
const MINIMAL_LENGTH = 1;

let PAGE = 1;
let value = null;
let totalAmount = 0;

export function fetchImages(request) {
  if (value !== request) {
    PAGE = 1;
    totalAmount = 0;
  }
  return axios
    .get(
      `${BASE_URL}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&page=${PAGE}&per_page=40`
    )
    .then(function (response) {
      const totalHits = response.data.totalHits;
      value = request;
      PAGE += 1;

      totalAmount += response.data.hits.length;

      if (response.data.hits.length < MINIMAL_LENGTH) {
        getMoreButtonRef.classList.add('is-hidden');
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (totalAmount >= totalHits) {
        getMoreButtonRef.classList.add('is-hidden');
        Notiflix.Report.warning(
          'Houston, we have a problem',
          "We're sorry, but you've reached the end of search results.",
          '🥶'
        );
        return;
      }
      return response.data.hits;
    })
    .catch();
}
