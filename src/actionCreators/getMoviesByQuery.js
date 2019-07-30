import makeAPIRequest from '../api';
import {
  FETCHING_MOVIES,
  FETCHING_MOVIES_SUCCESS,
  FETCHING_MOVIES_FAILURE
} from '../actions/list';

export default function(searchTerm = '', page = 1) {
  return async dispatch => {
    dispatch({ type: FETCHING_MOVIES });

    try {
      const response = await makeAPIRequest({ s: searchTerm, page: page });

      if (response.data.Error) {
        throw response.data;
      }

      dispatch({
        type: FETCHING_MOVIES_SUCCESS,
        payload: { response: response.data, page, searchTerm }
      });

      return;
    } catch (error) {
      dispatch({
        type: FETCHING_MOVIES_FAILURE,
        payload: {
          error: error.Error
            ? error.Error
            : 'something went wrong with the request'
        }
      });
    }
  };
}
