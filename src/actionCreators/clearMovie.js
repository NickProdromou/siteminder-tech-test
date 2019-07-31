import { CLEAR_SELECTED_MOVIE } from '../actions/list';

export default function(movieId) {
  return dispatch => {
    dispatch({ type: CLEAR_SELECTED_MOVIE, payload: { movieId } });
  };
}
