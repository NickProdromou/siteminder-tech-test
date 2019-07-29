import makeAPIRequest from '../api';
import {
  FETCHING_MOVIES,
  FETCHING_MOVIES_SUCCESS,
  FETCHING_MOVIES_FAILURE
} from '../actions/list';

export default function(searchTerm = '', page = 1) {
  return dispatch => {
    dispatch({ type: FETCHING_MOVIES });
    console.log(searchTerm, page);

    makeAPIRequest({ s: searchTerm, page: page })
      .then(response => {
        dispatch({
          type: FETCHING_MOVIES_SUCCESS,
          payload: { response: response.data, page, searchTerm }
        });
      })
      .catch(err => {
        dispatch({ type: FETCHING_MOVIES_FAILURE, payload: { error: err } });
      });
  };
}
