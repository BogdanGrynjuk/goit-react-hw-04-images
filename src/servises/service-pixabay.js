import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '29140475-66441d6b682f1f986b480bf70';

const fetchImages = async (searchQuery, page) => {
  
  const response = await axios.get(`?q=${searchQuery}&key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`);
  const images = response.data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
        id: id,
        webformatURL: webformatURL,
        largeImageURL: largeImageURL,
        tags: tags
        
  }));

  return images;
};

const api = {
    fetchImages,
};

export default api;

