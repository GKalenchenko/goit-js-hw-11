import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchImages } from './js/fetch_images';

let value = null;

const formRef = document.getElementById('search-form');
const cardListRef = document.querySelector('.gallery');
const getMoreButtonRef = document.querySelector('.load-more');

formRef.addEventListener('submit', onSubmit);
getMoreButtonRef.addEventListener('click', onClick);

function onClick() {
  fetchImages(value).then(createCards);
}

function onSubmit(e) {
  e.preventDefault();
  const { searchQuery } = e.currentTarget;

  if (value !== searchQuery.value) {
    cardListRef.innerHTML = '';
  }

  value = searchQuery.value;
  fetchImages(value).then(createCards);
}

function createCards(arrayOfCards) {
  if (arrayOfCards == undefined) return;

  getMoreButtonRef.classList.remove('is-hidden');
  const markup = arrayOfCards
    .map(card => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = card;

      return `<div class="photo-card">
    <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
    <b>Likes</b> <b>${likes}</b>
    </p>
    <p class="info-item">
    <b>Views ${views}</b>
    </p>
    <p class="info-item">
    <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
    <b>Downloads ${downloads}</b>
    </p>
    </div>
    </div>`;
    })
    .join('');
  cardListRef.insertAdjacentHTML('beforeend', markup);
}
