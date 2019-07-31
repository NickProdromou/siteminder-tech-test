import proxyquire, { noCallThru } from 'proxyquire';
import sinon from 'sinon';

noCallThru();

const makeAPIRequestStub = sinon.stub();

const getMovieDetail = proxyquire('../../src/actionCreators/getMovieDetail', {
  '../api': makeAPIRequestStub
}).default;

function resetStubs() {
  makeAPIRequestStub.reset();
}
describe('getMovieDetail action creator', () => {
  describe('when passed a movieId', () => {
    describe('and the repsonse is successful', () => {
      let movieId;
      let response;
      let dispatcher;

      before(() => {
        dispatcher = sinon.stub();
        movieId = 1234;
        response = {
          data: { movie: 'some movie' }
        };

        makeAPIRequestStub
          .withArgs({ i: movieId, plot: 'full' })
          .resolves(response);

        getMovieDetail(movieId)(dispatcher);
      });

      after(resetStubs);

      it('dispatcher dispatches the GET_MOVIE_DETAIL_LOADING action', () => {
        expect(dispatcher.firstCall).to.be.calledWith({
          type: 'GET_MOVIE_DETAIL_LOADING'
        });
      });

      it('dispatcher calls SET_SELECTED_MOVIE action with movie id as payload', () => {
        expect(dispatcher.secondCall).to.be.calledWith({
          type: 'SET_SELECTED_MOVIE',
          payload: { movieId }
        });
      });

      it('makeAPIRequest calls dispatch with GET_MOVIE_DETAIL_SUCCESS action and response data as payload', () => {
        expect(dispatcher.thirdCall).to.be.calledWith({
          type: 'GET_MOVIE_DETAIL_SUCCESS',
          payload: response.data
        });
      });
    });

    describe('and the response is failed', () => {
      let movieId;
      let error;
      let dispatcher;

      before(() => {
        dispatcher = sinon.stub();
        movieId = 1234;
        error = {
          data: {
            Error: 'something went wrong'
          }
        };

        makeAPIRequestStub.returnsThis();

        makeAPIRequestStub
          .withArgs({ i: movieId, plot: 'full' })
          .resolves(error);

        getMovieDetail(movieId)(dispatcher);
      });

      after(resetStubs);

      it('dispatcher dispatches the GET_MOVIE_DETAIL_LOADING action', () => {
        expect(dispatcher).to.be.calledWith({
          type: 'GET_MOVIE_DETAIL_LOADING'
        });
      });

      it('makeAPIRequest calls dispatch with GET_MOVIE_DETAIL_FAILURE action and error as payload ', () => {
        expect(dispatcher).to.be.calledWith({
          type: 'GET_MOVIE_DETAIL_FAILURE',
          payload: { error: error.data.Error }
        });
      });
    });
  });

  describe('when not passed a movieId', () => {
    let dispatcher;

    before(() => {
      dispatcher = sinon.stub();
      const func = getMovieDetail()(dispatcher);
    });

    after(resetStubs);

    it('dispatcher dispatches the GET_MOVIE_DETAIL_FAILURE action with some error text', () => {
      expect(dispatcher).to.be.calledWith({
        type: 'GET_MOVIE_DETAIL_FAILURE',
        payload: { error: 'movieId not passed' }
      });
    });

    it('makeAPIRrequest does not get called', () => {
      expect(makeAPIRequestStub).not.to.be.called;
    });
  });

  describe('when an error is thrown', () => {
    let movieId;
    let response;
    let dispatcher;

    before(() => {
      dispatcher = sinon.stub();
      movieId = 1234;
      response = {
        data: { movie: 'some movie' }
      };

      makeAPIRequestStub.withArgs({ i: movieId, plot: 'full' }).rejects();

      getMovieDetail(movieId)(dispatcher);
    });

    after(resetStubs);

    it('dispatcher dispatches the GET_MOVIE_DETAIL_LOADING action', () => {
      expect(dispatcher.firstCall).to.be.calledWith({
        type: 'GET_MOVIE_DETAIL_LOADING'
      });
    });

    it('dispatcher dispatches the GET_MOVIE_DETAIL_FAILURE action with some error text', () => {
      expect(dispatcher).to.be.calledWith({
        type: 'GET_MOVIE_DETAIL_FAILURE',
        payload: { error: 'something went wrong with the request' }
      });
    });
  });
});
