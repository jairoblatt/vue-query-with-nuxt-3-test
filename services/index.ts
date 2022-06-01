import axios from 'axios';

const HTTPClient = axios.create({
  baseURL: 'https://dog.ceo/api/breeds/image',
});

let count = 1;
export async function getDog(page = 1) {
  console.log('Fetched =>', { count, page });
  const { data } = await HTTPClient.get('/random');
  return {
    page,
    results: data,
    last_page: 10,
  };
}
