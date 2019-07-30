import {
  getSelectedMovie,
  getSelectedMovieLoadingState,
  getSelectedMovieErrorState,
  getIsMovieSelected,
  getSelectedMovieId
} from '../../src/selectors/movieDetail';

describe('movieDetail selectors', () => {
  describe('getSelectedMovie', () => {
    let state;
    let returnValue;

    before(() => {
      state = {
        movieDetail: {
          selectedMovie: {
            id: 1234,
            Title: 'some movie'
          }
        }
      };

      returnValue = getSelectedMovie(state);
    });

    it('returns the expected derived state', () => {
      expect(returnValue).to.deep.eq(state.movieDetail.selectedMovie);
    });
  });

  describe('getSelectedMovieLoadingState', () => {
    let state;
    let returnValue;

    before(() => {
      state = {
        movieDetail: {
          loading: true
        }
      };

      returnValue = getSelectedMovieLoadingState(state);
    });

    it('returns the expected derived state', () => {
      expect(returnValue).to.deep.eq(state.movieDetail.loading);
    });
  });

  describe('getSelectedMovieErrorState', () => {
    let state;
    let returnValue;

    before(() => {
      state = {
        movieDetail: {
          error: 'some kind of error text'
        }
      };

      returnValue = getSelectedMovieErrorState(state);
    });

    it('returns the expected derived state', () => {
      expect(returnValue).to.deep.eq(state.movieDetail.error);
    });
  });

  describe('getIsMovieSelected', () => {
    let state;
    let returnValue;

    before(() => {
      state = {
        movieDetail: {
          isMovieSelected: true
        }
      };

      returnValue = getIsMovieSelected(state);
    });

    it('returns the expected derived state', () => {
      expect(returnValue).to.deep.eq(state.movieDetail.isMovieSelected);
    });
  });

  describe('getSelectedMovieId', () => {
    let state;
    let returnValue;

    before(() => {
      state = {
        movieDetail: {
          selectedMovie: {
            imdbID: 1234,
            Title: 'some movie'
          }
        }
      };

      returnValue = getSelectedMovieId(state);
    });

    it('returns the expected derived state', () => {
      expect(returnValue).to.deep.eq(state.movieDetail.selectedMovie.imdbID);
    });
  });
});
