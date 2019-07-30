import makeAPIRequest from '../api';
import {
  GET_MOVIE_DETAIL_LOADING,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_FAILURE
} from '../actions/detail';
import { SET_SELECTED_MOVIE } from '../actions/list';

export default function(movieId) {
  return dispatch => {
    dispatch({ type: GET_MOVIE_DETAIL_LOADING });

    if (!movieId) {
      dispatch({
        type: GET_MOVIE_DETAIL_FAILURE,
        payload: { error: 'movieId not passed' }
      });

      return;
    }

    dispatch({ type: SET_SELECTED_MOVIE, payload: { movieId } });

    makeAPIRequest({ i: movieId, plot: 'full' })
      .then(response => {
        dispatch({
          type: GET_MOVIE_DETAIL_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({ type: GET_MOVIE_DETAIL_FAILURE, payload: { error: err } });
      });
  };
}
