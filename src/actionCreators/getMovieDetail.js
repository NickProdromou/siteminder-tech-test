import makeAPIRequest from '../api';
import {
  GET_MOVIE_DETAIL_LOADING,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_FAILURE
} from '../actions/detail';

export default function(movieId) {
  return dispatch => {
    if (!movieId) {
      dispatch({
        type: GET_MOVIE_DETAIL_FAILURE,
        payload: { error: 'movieId not passed' }
      });

      return;
    }

    dispatch({ type: GET_MOVIE_DETAIL_LOADING });

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
