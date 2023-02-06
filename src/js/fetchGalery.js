import axios from 'axios';
import { Notify } from 'notiflix';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '33414632-91dc2c07012505ffb510f0739';

export async function fetchImg(query,page,per_page) {
  try {
    const response = await axios.get(
        `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
        
      );
      const data = await response.data;
      return data;
  } catch (error) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    
  }
}
