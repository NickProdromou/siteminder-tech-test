import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getMoviesByQuery from './actionCreators/getMoviesbyQuery';
import getMovieDetail from './actionCreators/getMovieDetail';
import App from './App';
import './index.css';
import store from './reducers';

store.dispatch(getMoviesByQuery('star', 1));
store.dispatch(getMovieDetail('tt0086190'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
