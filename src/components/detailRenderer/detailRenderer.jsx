import React from 'react';
import Breakpoint from 'react-socks';
import MovieDetail from '../movieDetail';
import Modal from '../modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearMovie } from '../../actionCreators';

import {
  getSelectedMovie,
  getSelectedMovieErrorState,
  getSelectedMovieLoadingState,
  getIsMovieSelected,
  getSelectedMovieId
} from '../../selectors/';

export function DumbDetailRenderer(props) {
  const { isMovieSelected, selectedMovieId, clearSelection } = props;

  return (
    <React.Fragment>
      <Breakpoint small only>
        {isMovieSelected && (
          <Modal
            onClose={() => clearSelection(selectedMovieId)}
            render={() => <MovieDetail {...props} />}
          />
        )}
      </Breakpoint>
      <Breakpoint medium up>
        {isMovieSelected && <MovieDetail {...props} />}
      </Breakpoint>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  if (!getSelectedMovie(state)) {
    return {
      error: getSelectedMovieErrorState(state),
      loading: getSelectedMovieLoadingState(state),
      isSelected: getIsMovieSelected(state)
    };
  }

  return {
    title: getSelectedMovie(state).Title,
    genres: getSelectedMovie(state).Genre,
    plot: getSelectedMovie(state).Plot,
    imageUrl: getSelectedMovie(state).Poster,
    language: getSelectedMovie(state).Language,
    actors: getSelectedMovie(state).Actors,
    duration: getSelectedMovie(state).Runtime,
    error: getSelectedMovieErrorState(state),
    loading: getSelectedMovieLoadingState(state),
    isMovieSelected: getIsMovieSelected(state),
    selectedMovieId: getSelectedMovieId(state)
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators({ clearSelection: clearMovie }, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DumbDetailRenderer);
