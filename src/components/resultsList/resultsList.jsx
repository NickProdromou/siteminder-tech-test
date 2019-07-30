import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import MovieItem from '../movieItem';

import styles from './resultsList.module.scss';

export default class ResultsList extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    results: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  };

  renderLoading() {
    return (
      <div className={styles.loadingContainer}>
        <Spinner name="three-bounce" />
      </div>
    );
  }

  renderList() {
    const { results, getMovieDetail, clearMovieDetail } = this.props;

    return (
      (Array.isArray(results) && results.length && (
        <ul className={styles.itemList}>
          {results.map(item => (
            <li key={item.imdbID}>
              <MovieItem
                key={item.imdbID}
                {...item}
                getMovieDetail={getMovieDetail}
                clearMovieDetail={clearMovieDetail}
              />
            </li>
          ))}
        </ul>
      )) ||
      null
    );
  }

  render() {
    const { loading, error } = this.props;

    return (
      <div className={styles.Root}>
        <div className={styles.listContainer}>
          {error && <p data-test-id="results-list-error">{error}</p>}
          {loading ? this.renderLoading() : this.renderList()}
        </div>
      </div>
    );
  }
}
