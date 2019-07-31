import React from 'react';
import PropTypes from 'prop-types';

export default function MoviePosterImage({ imageUrl, title }) {
  if (!imageUrl) {
    return null;
  }

  return <img src={imageUrl} alt={title} />;
}

MoviePosterImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string
};

MoviePosterImage.defaultProps = {
  title: 'movie poster'
};
