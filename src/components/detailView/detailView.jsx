import PropTypes from 'prop-types';
import React from 'react';
import styles from './detailView.module.scss';

export default function DetailView({
  title,
  genres,
  plot,
  imageUrl,
  language,
  actors,
  duration,
  error,
  loading
}) {
  if (!title) {
    return null;
  }

  return (
    <article className={styles.Root}>
      <div className={styles.infoPane}>
        <h1 className={styles.movieTitle}>{title}</h1>
        <span>{genres}</span>
        <p className={styles.plotText}>{plot}</p>
        <div className={styles.movieStats}>
          <span>
            <b className={styles.statTitle}>Language: </b>
            {language}
          </span>
          <span>
            <b className={styles.statTitle}>Actors:</b>
            {actors}
          </span>
          <span>
            <b className={styles.statTitle}>Duration:</b>
            {duration}
          </span>
        </div>
      </div>
      <div className={styles.imagePane}>
        <img src={imageUrl} alt={title} />
      </div>
    </article>
  );
}

DetailView.propTypes = {
  title: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
  plot: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  actors: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};
