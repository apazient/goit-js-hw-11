import { Notify } from 'notiflix';
import getRefs from './js/refs';
import { KEY, fetchImg } from './js/fetchGalery';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const PER_PAGE = 40;
let page = 1;

const refs = getRefs();

refs.form.addEventListener(`submit`, onSearch);
refs.loadMoreBtn.addEventListener(`click`, onLoadMore);
refs.gallery.addEventListener(`mousedown`, openFullsceen);

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: `alt`,
  captionDelay: 250,
});

async function onSearch(e) {
  e.preventDefault();
  const userData = refs.input.value.trim();
  const { totalHits, hits } = await fetchImg(userData, page, PER_PAGE);

  clear(refs.gallery);

  if (!userData) {
    return Notify.failure('Please enter any word!');
  }

    refs.loadMoreBtn.classList.remove(`js-display`);
    
  disabledBtn(totalHits);
  renderGallery(hits);
  toogleBtn(totalHits, hits);
  lightBox.refresh();
}

async function onLoadMore(e) {
  e.preventDefault();
  page++;
  const userData = refs.input.value.trim();
  const { total, totalHits, hits } = await fetchImg(userData, page, PER_PAGE);
  renderGallery(hits);

  if (hits.length < 40) {
    refs.loadMoreBtn.classList.add(`js-display`);
    return Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
  lightBox.refresh();
}

function openFullsceen(e) {
  e.preventDefault();
  if (e.target.nodeName !== `IMG`) {
    return;
  }
}

function disabledBtn(foundedQuery) {
  if (!foundedQuery) {
    refs.loadMoreBtn.classList.add(`js-display`);
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function toogleBtn(foundedQuery, loadetQuery) {
  if (foundedQuery > 40) {
    refs.loadMoreBtn.classList.remove(`js-display`);
  }
  if (loadetQuery.length < 40) {
    refs.loadMoreBtn.classList.add(`js-display`);
  }
}


function createGalleryCard(galleryItems) {
  return galleryItems
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return ` <div class="photo-card">
        <div class="thumb">
        <a class="gallery-item" href="${largeImageURL}">
    <img src="${webformatURL}" data-source="${largeImageURL}" alt="${tags}" loading="lazy" width=200px />
    </a>
    </div>
   <div class="info">
    <p class="info-item">
      <b>Likes </b>${likes}
    </p>
    <p class="info-item">
      <b>Views </b>${views}
    </p>
    <p class="info-item">
      <b>Comments </b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads </b>${downloads}
    </p>
  </div>     
 </div>`;
      }
    )
    .join(``);
}

function renderGallery(item) {
  const markup = createGalleryCard(item);
  refs.gallery.insertAdjacentHTML(`beforeend`, markup);
}
function clear(item) {
  item.innerHTML = ``;
}
