import { CLEAR_RESULTS } from '../actions/list';

export default function() {
  return dispatch => {
    dispatch({ type: CLEAR_RESULTS });
  };
}
