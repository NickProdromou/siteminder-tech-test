import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './movieDetail.module.scss';
import MovieSummary from './movieSummary';
import MoviePosterImage from './moviePosterImage';
import Spinner from 'react-spinkit';
import { ErrorIcon } from '../icons';

export default class MovieDetail extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    genres: PropTypes.string.isRequired,
    plot: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    actors: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    loading: PropTypes.bool.isRequired
  };

  renderError() {
    const { error } = this.props;

    return (
      <div className={styles.errorState} data-testid="movie-detail-error">
        <ErrorIcon className={styles.errorIcon} />
        <p>Loading movie details encountered an error:{error}</p>
      </div>
    );
  }

  renderLoading() {
    return (
      <div class={styles.loadingContainer} data-testid="movie-detail-loading">
        <Spinner />
      </div>
    );
  }

  renderUI() {
    const {
      title,
      genres,
      plot,
      imageUrl,
      language,
      actors,
      duration,
      year
    } = this.props;

    const summaryProps = { language, actors, duration, year };
    const imageProps = {
      title,
      imageUrl:
        imageUrl === 'N/A'
          ? `https://via.placeholder.com/300x444?text=${title}`
          : imageUrl
    };

    return (
      <article className={styles.Root}>
        <div className={styles.infoPane}>
          <h1 className={styles.movieTitle} data-testid="movie-detail-title">
            {title}
          </h1>
          <span
            className={styles.genres}
            data-testid="movie-detail-genres-text"
          >
            {genres}
          </span>
          <p className={styles.plotText} data-testid="movie-detail-plot-text">
            {plot}
          </p>
          <MovieSummary {...summaryProps} />
        </div>
        <div className={styles.imagePane}>
          <MoviePosterImage {...imageProps} />
        </div>
      </article>
    );
  }

  render() {
    const { error, loading } = this.props;

    if (error) {
      return this.renderError();
    }

    if (loading && !error) {
      return this.renderLoading();
    }

    if (!loading && !error) {
      return this.renderUI();
    }
  }
}
