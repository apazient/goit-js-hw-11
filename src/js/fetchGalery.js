import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '33414632-91dc2c07012505ffb510f0739';

export async function fetchImg(query) {
  try {
    const response = await axios.get(
        `?key=${KEY}&q=${query}&q=cat+dog&image_type=photo&orientation=horizontal&safesearch=true`
        
      );
      console.log(response)
    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error.message);
  }
}
fetchImg().then(console.log)