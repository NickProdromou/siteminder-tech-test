import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from '../icons';
import styles from './pageNavigation.module.scss';
import classNames from 'classnames';

export default function PageNavigation({
  hasNextPage,
  hasPrevPage,
  pageNumber,
  totalCount,
  getNextPage,
  getPrevPage,
  searchTerm
}) {
  const rootClass = classNames(styles.Root, {
    [`${styles.withoutPrevButton}`]: !hasPrevPage,
    [`${styles.withoutNextButton}`]: !hasNextPage
  });

  return (
    <div className={rootClass}>
      {hasPrevPage && (
        <button
          className={styles.controlButton}
          onClick={() => getPrevPage(searchTerm, pageNumber)}
          data-test-id="prev-page-button"
        >
          <ChevronLeft />
        </button>
      )}
      <div className={styles.listInfo}>
        {pageNumber && <span data-test-id="pageNumber">Page {pageNumber}</span>}
        <span data-test-id="totalCount">{totalCount} Results</span>
      </div>
      {hasNextPage && (
        <button
          className={styles.controlButton}
          onClick={() => getNextPage(searchTerm, pageNumber)}
          data-test-id="next-page-button"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
}

PageNavigation.propTypes = {
  hasNextPage: PropTypes.bool.isRequired,
  hasPrevPage: PropTypes.bool.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  getNextPage: PropTypes.func.isRequired,
  getPrevPage: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired
};
