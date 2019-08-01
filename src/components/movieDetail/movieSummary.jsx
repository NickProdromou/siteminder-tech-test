import React from 'react';
import PropTypes from 'prop-types';
import styles from './movieSummary.module.scss';

export default function movieSummary(props) {
  const summaryItems = Object.keys(props).map(propName => {
    const testId = `movie-summary-${propName}`;

    return (
      (props[propName] && (
        <span data-testid={testId} key={testId}>
          <b className={styles.summaryHeading}>{propName}:</b>
          <span className={styles.statText}>{props[propName]}</span>
        </span>
      )) ||
      null
    );
  });

  return <div className={styles.Root}>{summaryItems}</div>;
}

movieSummary.propTypes = {
  language: PropTypes.string,
  actors: PropTypes.string,
  duration: PropTypes.string,
  year: PropTypes.string
};
