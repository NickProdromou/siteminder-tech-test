import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import MovieItem from '../movieItem';

import styles from './resultsList.module.scss';

export default class ResultsList extends Component {
  static propTypes = {
    ItemComponent: PropTypes.func
  };

  renderLoading() {
    return (
      <div className={styles.loadingContainer}>
        <Spinner name="three-bounce" />
      </div>
    );
  }

  renderList() {
    const { results } = this.props;

    return (
      (Array.isArray(results) && results.length && (
        <ul className={styles.itemList}>
          {results.map(item => (
            <li key={item.id}>
              <MovieItem key={item.id} {...item} />
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
          {error && <p>{error}</p>}
          {loading ? this.renderLoading() : this.renderList()}
        </div>
      </div>
    );
  }
}
