import { Notify } from 'notiflix';
import getRefs from './js/refs';
import { KEY, fetchImg} from './js/fetchGalery';

const refs = getRefs();
console.log(refs.form);
console.log(refs.btn);
console.log(refs.input);
refs.form.addEventListener(`submit`, onSubmit);

async function onSubmit(e) {
    e.preventDefault();
    const userData = refs.input.value.trim();
    if (!userData) {
        return Notify.failure('Please enter any word!');
    }
    const { total, totalHits, hits}=  await fetchImg(userData);
    console.log(hits)
renderGallery(hits)
}
function createGalleryCard(galleryItems) {
return galleryItems.map(({webformatURL,largeImageURL ,tags,likes,views,comments,downloads})=> {
    return     ` <div class="photo-card">
    <img src="${webformatURL}" data-source="${largeImageURL}" alt="${tags}" loading="lazy" />
   <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>     
 </div>`
    }).join(``);     
}
function renderGallery(item) {
    const markup=createGalleryCard(item)
    refs.gallery.insertAdjacentHTML(`beforeend`, markup);
  }
