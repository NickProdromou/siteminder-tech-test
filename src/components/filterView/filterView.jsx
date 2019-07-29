import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getMoviesByQuery,
  getNextPage,
  getPreviousPage
} from '../../actionCreators';
import MovieItem from '../movieItem';
import PaginatedList from '../paginatedList/paginatedList';
import Search from '../search';
import styles from './filterView.module.scss';

export function DumbFilterView({
  onInput,
  items,
  pageNumber,
  totalCount,
  loading,
  searchTerm,
  getNextPage,
  getPreviousPage
}) {
  return (
    <div className={styles.Root}>
      <div className={styles.searchContainer}>
        <Search onInput={onInput} />
      </div>
      <div className={styles.listContainer}>
        <PaginatedList
          ItemComponent={MovieItem}
          itemsForPage={items}
          pageNumber={pageNumber}
          totalCount={totalCount}
          getNextPage={getNextPage}
          getPrevPage={getPreviousPage}
          loading={loading}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}

DumbFilterView.propTypes = {};

function mapStateToProps(state) {
  const { movieList } = state;

  return {
    items: movieList.items,
    pageNumber: movieList.currentPage,
    totalCount: movieList.totalCount,
    loading: movieList.loadingMovies,
    searchTerm: movieList.searchTerm
  };
}

function mapDispatchToProps(dispatch) {
  const boundActionCreators = bindActionCreators(
    {
      onInput: getMoviesByQuery,
      getNextPage,
      getPreviousPage
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
