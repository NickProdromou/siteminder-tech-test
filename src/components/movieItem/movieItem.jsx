import React from 'react';
import PropTypes from 'prop-types';
import styles from './movieItem.module.scss';
import StarIcon from '../icons/star';

export default function movieItem({
  Title,
  Year,
  isSelected,
  imdbID: id,
  getMovieDetail
}) {
  return (
    <article className={styles.Root} onClick={() => getMovieDetail(id)}>
      <div className={styles.titleContainer}>
        <h1 className={styles.titleText} data-test-id="title-text">
          {Title}
        </h1>
      </div>
      <div className={styles.infoContainer}>
        {isSelected && <StarIcon className={styles.selectedIcon} />}
        <p className={styles.releaseYear} data-test-id="release-year-text">
          {Year}
        </p>
      </div>
    </article>
  );
}

movieItem.propTypes = {
  Title: PropTypes.string.isRequired,
  Year: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  getMovieDetail: PropTypes.func.isRequired
};

movieItem.defaultProps = {
  isSelected: false
};
