import {
  FETCHING_MOVIES,
  FETCHING_MOVIES_SUCCESS,
  FETCHING_MOVIES_FAILURE,
  CLEAR_RESULTS
} from '../actions/list';

export const initialState = {
  searchTerm: '',
  items: [],
  totalCount: '0',
  currentPage: 0,
  loadingMovies: false,
  loadingMovieDetail: false,
  error: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_MOVIES: {
      return { ...state, loadingMovies: true };
    }

    case FETCHING_MOVIES_SUCCESS: {
      const { response, page, searchTerm } = action.payload;

      return {
        ...state,
        loadingMovies: false,
        items: response.Search,
        totalCount: response.totalResults,
        currentPage: page,
        searchTerm,
        error: false
      };
    }

    case FETCHING_MOVIES_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        loadingMovies: false,
        items: [],
        error,
        currentPage: 0,
        totalCount: 0
      };
    }

    case CLEAR_RESULTS: {
      return {
        ...state,
        error: false,
        currentPage: 0,
        totalCount: 0,
        items: []
      };
    }

    default:
      return state;
  }
}
