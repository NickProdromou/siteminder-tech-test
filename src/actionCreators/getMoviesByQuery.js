import makeAPIRequest from '../api';
import {
  FETCHING_MOVIES,
  FETCHING_MOVIES_SUCCESS,
  FETCHING_MOVIES_FAILURE
} from '../actions/list';

export default function(searchTerm = '', page = 1) {
  return dispatch => {
    dispatch({ type: FETCHING_MOVIES, payload: { searchTerm, page } });

    makeAPIRequest({ s: searchTerm, page: page })
      .then(response => {
        if (!response.data.Error) {
          dispatch({
            type: FETCHING_MOVIES_SUCCESS,
            payload: { response: response.data, page, searchTerm }
          });
        } else {
          throw response.data;
        }
      })
      .catch(err => {
        dispatch({
          type: FETCHING_MOVIES_FAILURE,
          payload: err
        });
      });
  };
}
