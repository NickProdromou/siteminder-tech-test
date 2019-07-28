import proxyquire, { noCallThru } from 'proxyquire';
import sinon from 'sinon';

noCallThru();

const makeAPIRequestStub = sinon.stub();
const thenStub = sinon.stub();
const catchStub = sinon.stub();

const getMovieDetail = proxyquire('../../src/actionCreators/getMovieDetail', {
  '../api': makeAPIRequestStub
}).default;

function resetStubs() {
  makeAPIRequestStub.reset();
  thenStub.reset();
  catchStub.reset();
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

        makeAPIRequestStub.returnsThis();

        makeAPIRequestStub.withArgs({ i: movieId, plot: 'full' }).returns({
          then: thenStub,
          catch: catchStub
        });
        thenStub.callsArgWith(0, response).returnsThis();
        const func = getMovieDetail(movieId);

        func(dispatcher);
      });

      after(resetStubs);

      it('dispatcher dispatches the GET_MOVIE_DETAIL_LOADING action', () => {
        expect(dispatcher).to.be.calledWith({
          type: 'GET_MOVIE_DETAIL_LOADING'
        });
      });

      it('makeAPIRequest calls dispatch with GET_MOVIE_DETAIL_SUCCESS action and response data as payload', () => {
        expect(dispatcher).to.be.calledWith({
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
          text: 'something went wrong'
        };

        makeAPIRequestStub.returnsThis();

        makeAPIRequestStub.withArgs({ i: movieId, plot: 'full' }).returns({
          then: thenStub,
          catch: catchStub
        });
        thenStub.returnsThis();
        catchStub.callsArgWith(0, error);
        const func = getMovieDetail(movieId);

        func(dispatcher);
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
          payload: { error }
        });
      });
    });
  });

  describe('when not passed a movieId', () => {
    let dispatcher;

    before(() => {
      dispatcher = sinon.stub();
      const func = getMovieDetail();

      func(dispatcher);
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
});
