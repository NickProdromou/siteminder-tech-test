import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getMoviesByQuery,
  getNextPage,
  getPreviousPage,
  clearResults
} from '../../actionCreators';
import ResultsList from '../resultsList';
import Search from '../search';
import styles from './filterView.module.scss';
import PageNavigation from '../pageNavigation';

import {
  showNextPageButton,
  showPreviousPageButton,
  getTotalCount,
  getPageNumber,
  getSearchTerm,
  getMovieItems,
  getLoadingState,
  getErrorState
} from '../../selectors';

export function DumbFilterView({
  onInput,
  clearResults,
  items,
  loading,
  error,
  hasNextPage,
  hasPrevPage,
  pageNumber,
  totalCount,
  getNextPage,
  getPrevPage,
  searchTerm
}) {
  return (
    <div className={styles.Root}>
      <div className={styles.searchContainer}>
        <Search onInput={onInput} clearResults={clearResults} />
      </div>
      <div className={styles.listContainer}>
        <ResultsList results={items} loading={loading} error={error} />
      </div>
      <PageNavigation
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        pageNumber={pageNumber}
        totalCount={totalCount}
        getNextPage={getNextPage}
        getPrevPage={getPrevPage}
        searchTerm={searchTerm}
      />
    </div>
  );
}

DumbFilterView.propTypes = {};

function mapStateToProps(state) {
  console.log(getSearchTerm(state));

  return {
    items: getMovieItems(state),
    loading: getLoadingState(state),
    error: getErrorState(state),
    hasNextPage: showNextPageButton(state),
    hasPrevPage: showPreviousPageButton(state),
    totalCount: getTotalCount(state),
    searchTerm: getSearchTerm(state),
    pageNumber: getPageNumber(state)
  };
}

function mapDispatchToProps(dispatch) {
  const boundActionCreators = bindActionCreators(
    {
      onInput: getMoviesByQuery,
      clearResults,
      getNextPage,
      getPrevPage: getPreviousPage
    },
    dispatch
  );

  return {
    ...boundActionCreators
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DumbFilterView);
