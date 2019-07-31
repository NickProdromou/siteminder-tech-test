import makeAPIRequest from '../api';
import {
  GET_MOVIE_DETAIL_LOADING,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_FAILURE
} from '../actions/detail';
import { SET_SELECTED_MOVIE } from '../actions/list';

export default function(movieId) {
  return async dispatch => {
    try {
      dispatch({ type: GET_MOVIE_DETAIL_LOADING });

      if (!movieId) {
        dispatch({
          type: GET_MOVIE_DETAIL_FAILURE,
          payload: { error: 'movieId not passed' }
        });

        return;
      }
      dispatch({ type: SET_SELECTED_MOVIE, payload: { movieId } });

      const response = await makeAPIRequest({ i: movieId, plot: 'full' });

      if (response.data.Error) {
        throw response.data;
      }

      dispatch({ type: GET_MOVIE_DETAIL_SUCCESS, payload: response.data });

      return;
    } catch (error) {
      dispatch({
        type: GET_MOVIE_DETAIL_FAILURE,
        payload: {
          error: error.Error
            ? error.Error
            : 'something went wrong with the request'
        }
      });
    }
  };
}
