import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import movieList from './movieList';
import movieDetail from './movieDetail';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  movieList,
  movieDetail
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
