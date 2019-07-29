import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '../icons/search';
import debounce from 'lodash.debounce';

import styles from './search.module.scss';

export default class Search extends Component {
  state = {
    searchText: ''
  };

  static propTypes = {
    onInput: PropTypes.func.isRequired
  };

  handleChange = e => {
    const { value } = e.target;

    this.setState(
      {
        searchText: value
      },
      () => {
        this.setSearchTerm();
      }
    );
  };

  setSearchTerm = debounce(() => {
    const { searchText } = this.state;
    const { onInput } = this.props;

    onInput(searchText);
  }, 1000);

  render() {
    const { searchText } = this.state;

    return (
      <div className={styles.Root}>
        <input
          className={styles.textInput}
          type="text"
          value={searchText}
          onChange={this.handleChange}
          placeholder="Search movies"
          data-test-id="searchInput"
        />
        <SearchIcon className={styles.searchIcon} />
      </div>
    );
  }
}
