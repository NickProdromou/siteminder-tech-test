import { createSelector } from 'reselect';

const getMovieDetailState = state => state.movieDetail;

export const getSelectedMovie = createSelector(
  getMovieDetailState,
  state => state.selectedMovie
);

export const getSelectedMovieLoadingState = createSelector(
  getMovieDetailState,
  state => state.loading
);

export const getSelectedMovieErrorState = createSelector(
  getMovieDetailState,
  state => state.error
);

export const getIsMovieSelected = createSelector(
  getMovieDetailState,
  state => state.isMovieSelected
);

export const getSelectedMovieId = createSelector(
  getSelectedMovie,
  state => state.imdbID
);
