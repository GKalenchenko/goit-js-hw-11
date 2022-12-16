import axios from 'axios';
import Notiflix from 'notiflix';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
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
//-----------------------------------------------------------------------
const options = {
  totalItems: 10,
  itemsPerPage: 10,
  visiblePages: 10,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination('pagination', options);

function createPagination(totalHits) {
  console.log(totalHits);
  const pagination = new Pagination(
    document.getElementById('tui-pagination-container'),
    {
      totalItems: totalHits,
      itemsPerPage: 10,
      visiblePages: 5,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
    }
  );
  pagination.on('afterMove', event => {
    refs.list.innerHTML = '';
    const currentPage = event.page;
    const query = refs.input.value.trim();
    fetchImages(query, currentPage)
      .then(data => {
        refs.list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        gallery.refresh();
      })
      .catch(console.error());
    console.log(currentPage);
  });
}
