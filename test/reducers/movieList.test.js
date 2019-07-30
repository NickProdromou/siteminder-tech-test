import movieListReducer, { initialState } from '../../src/reducers/movieList';

describe('movieList reducer', () => {
  describe('when receiving FETCHING_MOVIES action', () => {
    let action;
    let returnedState;

    before(() => {
      action = { type: 'FETCHING_MOVIES' };
      returnedState = movieListReducer(initialState, action);
    });

    it('returns the state with loadingMovies set to true', () => {
      expect(returnedState).to.deep.eq({
        ...initialState,
        loadingMovies: true
      });
    });
  });

  describe('when receiving FETCHING_MOVIES_SUCCESS action', () => {
    let action;
    let returnedState;

    before(() => {
      action = {
        type: 'FETCHING_MOVIES_SUCCESS',
        payload: {
          response: {
            Search: [{ movie: 1 }, { movie: 2 }, { movie: 3 }],
            totalResults: 1234,
            searchTerm: 'star wars'
          },
          page: 2
        }
      };
      returnedState = movieListReducer(initialState, action);
    });

    it('returns the expected state', () => {
      expect(returnedState).to.deep.eq({
        ...initialState,
        loadingMovies: false,
        items: action.payload.response.Search,
        totalCount: action.payload.response.totalResults,
        currentPage: action.payload.page,
        searchTerm: action.payload.searchTerm,
        error: false
      });
    });
  });

  describe('when receiving FETCIHNG_MOVIES_FAILURE action', () => {
    let action;
    let returnedState;

    before(() => {
      action = {
        type: 'FETCHING_MOVIES_FAILURE',
        payload: { Error: 'some error' }
      };
      returnedState = movieListReducer(initialState, action);
    });

    it('returns the expected state', () => {
      expect(returnedState).to.deep.eq({
        ...initialState,
        loadingMovies: false,
        error: action.payload.error,
        totalCount: 0,
        currentPage: 0
      });
    });
  });

  describe('when receiving CLEAR_RESULTS action', () => {
    let action;
    let returnedState;

    before(() => {
      action = {
        type: 'CLEAR_RESULTS'
      };
      returnedState = movieListReducer(initialState, action);
    });

    it('returns the expected state', () => {
      expect(returnedState).to.deep.eq({
        ...initialState,
        error: false,
        currentPage: 0,
        totalCount: 0,
        items: []
      });
    });
  });

  describe('when receiving any random action', () => {
    let action;
    let returnedState;

    before(() => {
      action = { type: 'UNKNOWN_ACTION' };
      returnedState = movieListReducer(initialState, action);
    });

    it('returns the initial state', () => {
      expect(returnedState).to.deep.eq(initialState);
    });
  });
});
