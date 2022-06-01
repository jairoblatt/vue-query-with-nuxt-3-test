import axios from 'axios';

const HTTPClient = axios.create({
  baseURL: 'https://dog.ceo/api/breeds/image',
});

export async function getDog(page = 1) {
  const { data } = await HTTPClient.get('/random');
  return {
    page,
    results: data,
    last_page: 10,
  };
}
