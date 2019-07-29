import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from '../icons';
import styles from './paginatedList.module.scss';

export default class PaginatedList extends Component {
  static propTypes = {
    pageNumber: PropTypes.number,
    itemsForPage: PropTypes.array,
    ItemComponent: PropTypes.func,
    getNextpage: PropTypes.func.isRequired,
    getPrevPage: PropTypes.func.isRequired,
    totalCount: PropTypes.number
  };

  renderEmptyResult() {
    return <div>No movies matched the search query</div>;
  }

  renderLoading() {
    return <div>Loading</div>;
  }

  renderList() {
    const { itemsForPage, ItemComponent } = this.props;

    return (
      (Array.isArray(itemsForPage) && itemsForPage.length && (
        <ul className={styles.itemList}>
          {itemsForPage.map(item => (
            <li key={item.id}>
              <ItemComponent key={item.id} {...item} />
            </li>
          ))}
        </ul>
      )) ||
      this.renderEmptyResult()
    );
  }

  render() {
    const {
      pageNumber,
      totalCount,
      getNextPage,
      getPrevPage,
      searchTerm,
      loading
    } = this.props;

    return (
      <div className={styles.Root}>
        <div className={styles.listContainer}>
          {loading ? this.renderLoading() : this.renderList()}
        </div>
        <div className={styles.footer}>
          <button
            className={styles.controlButton}
            onClick={e => getPrevPage(searchTerm, pageNumber)}
          >
            <ChevronLeft />
          </button>
          <div className={styles.listInfo}>
            <span>Page {pageNumber}</span>
            <span>{totalCount} Results</span>
          </div>
          <button
            className={styles.controlButton}
            onClick={e => getNextPage(searchTerm, pageNumber)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    );
  }
}
