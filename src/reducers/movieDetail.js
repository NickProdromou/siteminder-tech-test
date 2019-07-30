import {
  GET_MOVIE_DETAIL_LOADING,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_FAILURE
} from '../actions/detail';

import { CLEAR_SELECTED_MOVIE } from '../actions/list';

export const initialState = {
  selectedMovie: null,
  loading: false,
  error: null,
  isMovieSelected: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE_DETAIL_LOADING: {
      return { ...state, loading: true };
    }

    case GET_MOVIE_DETAIL_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        loading: false,
        selectedMovie: payload,
        isMovieSelected: true
      };
    }

    case GET_MOVIE_DETAIL_FAILURE: {
      return { ...state, loading: false, error: true, isMovieSelected: false };
    }

    case CLEAR_SELECTED_MOVIE: {
      return { ...state, isMovieSelected: false, error: false };
    }

    default: {
      return state;
    }
  }
}
