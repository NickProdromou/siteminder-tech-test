import proxyquire, { noCallThru } from 'proxyquire';
import sinon from 'sinon';

noCallThru();

const makeAPIRequestStub = sinon.stub();
const thenStub = sinon.stub();
const catchStub = sinon.stub();

const getMoviesByQuery = proxyquire(
  '../../src/actionCreators/getMoviesByQuery',
  {
    '../api': makeAPIRequestStub
  }
).default;

function resetStubs() {
  makeAPIRequestStub.reset();
  thenStub.reset();
  catchStub.reset();
}

describe('getMoviesByQuery action creator', () => {
  describe('when the request is successful', () => {
    let searchTerm;
    let page;
    let dispatcher;
    let response;

    before(() => {
      dispatcher = sinon.stub();
      searchTerm = 'star wars';
      response = {
        data: {
          items: [{ title: 'a new hope' }]
        }
      };
      page = 2;

      makeAPIRequestStub.returnsThis();

      makeAPIRequestStub.withArgs({ s: searchTerm }).returns({
        then: thenStub,
        catch: catchStub
      });
      thenStub.callsArgWith(0, response).returnsThis();

      getMoviesByQuery(searchTerm, page)(dispatcher);
    });

    after(resetStubs);

    it('calls the dispatcher with the FETCHING_MOVIES action', () => {
      expect(dispatcher).to.be.calledWith({ type: 'FETCHING_MOVIES' });
    });

    it('calls the dispatcher with the FETCHING_MOVIES_SUCCESS action, with the repsonse data and page as payload', () => {
      expect(dispatcher).to.be.calledWith({
        type: 'FETCHING_MOVIES_SUCCESS',
        payload: { response: response.data, page }
      });
    });
  });

  describe('when the request is unsuccessful', () => {
    let searchTerm;
    let page;
    let dispatcher;
    let error;

    before(() => {
      dispatcher = sinon.stub();
      searchTerm = 'dhfgiundfgojsdngjdg something that doesnt exist';
      error = {
        text: 'something went wrong'
      };
      page = 2;

      makeAPIRequestStub.returnsThis();

      makeAPIRequestStub.withArgs({ s: searchTerm }).returns({
        then: thenStub,
        catch: catchStub
      });
      thenStub.returnsThis();
      catchStub.callsArgWith(0, error).returnsThis();

      getMoviesByQuery(searchTerm, page)(dispatcher);
    });

    it('calls the dispatcher with the FETCHING_MOVIES action', () => {
      expect(dispatcher).to.be.calledWith({ type: 'FETCHING_MOVIES' });
    });

    it('makeAPIRequest calls dispatcher with FETCHING_MOVIES_FAILURE action and error as payload', () => {
      expect(dispatcher).to.be.calledWith({
        type: 'FETCHING_MOVIES_FAILURE',
        payload: { error }
      });
    });
  });
});
