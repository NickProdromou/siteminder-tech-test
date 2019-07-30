import React from 'react';
import PropTypes from 'prop-types';

export default function MoviePosterImage({ imageUrl, title }) {
  return <img src={imageUrl} alt={title} />;
}

MoviePosterImage.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string
};
