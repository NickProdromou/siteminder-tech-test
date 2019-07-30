import getMoviesByQuery from './getMoviesByQuery';

export default function(searchTerm, page) {
  return getMoviesByQuery(searchTerm, page - 1);
}
