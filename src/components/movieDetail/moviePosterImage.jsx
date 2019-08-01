import React from 'react';
import PropTypes from 'prop-types';
import styles from './moviePosterImage.module.scss';

export default function MoviePosterImage({ imageUrl, title }) {
  if (!imageUrl) {
    return null;
  }

  return <img className={styles.Root} src={imageUrl} alt={title} />;
}

MoviePosterImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string
};

MoviePosterImage.defaultProps = {
  title: 'movie poster'
};
