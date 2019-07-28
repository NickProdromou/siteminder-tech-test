import {
  GET_MOVIE_DETAIL_LOADING,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_FAILURE
} from '../actions/detail';

export const initialState = {
  selectedMovie: null,
  loading: false,
  selectedMovieError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE_DETAIL_LOADING: {
      return { ...state, loading: true };
    }

    case GET_MOVIE_DETAIL_SUCCESS: {
      const { payload } = action;

      return { ...state, loading: false, selectedMovie: payload };
    }

    case GET_MOVIE_DETAIL_FAILURE: {
      return { ...state, loading: false, selectedMovieError: true };
    }

    default: {
      return state;
    }
  }
}
