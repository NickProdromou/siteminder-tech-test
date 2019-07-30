import React from 'react';
import PropTypes from 'prop-types';
import styles from './movieSummary.module.scss';

export default function movieSummary({ language, actors, duration }) {
  console.log(language, actors, duration);

  return (
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
  );
}

movieSummary.propTypes = {
  language: PropTypes.string.isRequired,
  actors: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired
};
