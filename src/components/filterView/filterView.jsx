import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Search from '../search';
import MovieItem from '../movieItem';
import { getMoviesByQuery } from '../../actionCreators';
import styles from './filterView.module.scss';

export function DumbFilterView({ onInput, items }) {
  return (
    <div>
      <div className={styles.searchContainer}>
        <Search onInput={onInput} />
      </div>
      <p>paginatedList</p>
      {items && items.map(item => <MovieItem {...item} />)}
    </div>
  );
}

DumbFilterView.propTypes = {};

function mapStateToProps(state) {
  const { movieList } = state;

  return {
    items: movieList.items
  };
}

function mapDispatchToProps(dispatch) {
  const boundActionCreators = bindActionCreators(
    { onInput: getMoviesByQuery },
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
