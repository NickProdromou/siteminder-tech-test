import axios from 'axios';
import qs from 'qs';

const OMDMovieAPI = axios.create({
  baseURL: 'http://www.omdbapi.com'
});

export default function makeAPIRequest(queryParams = {}) {
  return OMDMovieAPI.get(
    `?${qs.stringify({
      apiKey: process.env.REACT_APP_OMD_API_KEY,
      type: 'movie',
      ...queryParams
    })}`
  );
}
