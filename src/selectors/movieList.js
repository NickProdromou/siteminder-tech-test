import { createSelector } from 'reselect';

const getMovieListState = state => state.movieList;

export const getMovieItems = createSelector(
  getMovieListState,
  state => state.items
);

export const getTotalCount = createSelector(
  getMovieListState,
  state => state.totalCount
);

export const getPageNumber = createSelector(
  getMovieListState,
  state => state.currentPage
);

export const getSearchTerm = createSelector(
  getMovieListState,
  state => state.searchTerm
);

export const getLoadingState = createSelector(
  getMovieListState,
  state => state.loading
);

export const getErrorState = createSelector(
  getMovieListState,
  state => state.error
);

export const showNextPageButton = createSelector(
  [getMovieItems, getTotalCount],
  (movieItems, totalCount) => totalCount > 10 && movieItems.length === 10
);

export const showPreviousPageButton = createSelector(
  [getPageNumber],
  pageNumber => pageNumber > 1
);
