import proxyquire, { noCallThru } from 'proxyquire';
import sinon from 'sinon';

noCallThru();

const makeAPIRequestStub = sinon.stub();

const getMoviesByQuery = proxyquire(
  '../../src/actionCreators/getMoviesByQuery',
  {
    '../api': makeAPIRequestStub
  }
).default;

function resetStubs() {
  makeAPIRequestStub.reset();
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
      page = 2;
      response = {
        data: {
          items: [{ title: 'a new hope' }]
        }
      };
      page = 2;

      makeAPIRequestStub.withArgs({ s: searchTerm, page }).resolves(response);

      getMoviesByQuery(searchTerm, page)(dispatcher);
    });

    after(resetStubs);

    it('calls the dispatcher with the FETCHING_MOVIES action', () => {
      expect(dispatcher.firstCall).to.be.calledWith({
        type: 'FETCHING_MOVIES'
      });
    });

    it('calls the dispatcher with the FETCHING_MOVIES_SUCCESS action, with the repsonse data and page as payload', () => {
      expect(dispatcher.secondCall).to.be.calledWith({
        type: 'FETCHING_MOVIES_SUCCESS',
        payload: { response: response.data, page, searchTerm }
      });
    });
  });

  describe('when the request is unsuccessful', () => {
    let searchTerm;
    let page;
    let dispatcher;
    let response;

    before(() => {
      dispatcher = sinon.stub();
      searchTerm = 'dhfgiundfgojsdngjdg something that doesnt exist';
      response = {
        data: { Error: 'something went wrong' }
      };
      page = 2;

      makeAPIRequestStub.withArgs({ s: searchTerm, page }).resolves(response);

      getMoviesByQuery(searchTerm, page)(dispatcher);
    });

    after(resetStubs);

    it('calls the dispatcher with the FETCHING_MOVIES action', () => {
      expect(dispatcher.firstCall).to.be.calledWith({
        type: 'FETCHING_MOVIES'
      });
    });

    it('calls dispatcher with FETCHING_MOVIES_FAILURE action and error as payload', () => {
      expect(dispatcher.secondCall).to.be.calledWith({
        type: 'FETCHING_MOVIES_FAILURE',
        payload: { error: response.data.Error }
      });
    });
  });

  describe('when makeAPIRequest throws an error', () => {
    let searchTerm;
    let page;
    let dispatcher;
    let error;

    before(() => {
      searchTerm = 'abc';
      page = 2;
      dispatcher = sinon.stub();
      error = new Error('something went wrong');

      makeAPIRequestStub.withArgs({ s: searchTerm, page }).rejects(error);

      getMoviesByQuery(searchTerm, page)(dispatcher);
    });

    after(resetStubs);

    it('calls the dispatcher with the FETCHING_MOVIES action', () => {
      expect(dispatcher.firstCall).to.be.calledWith({
        type: 'FETCHING_MOVIES'
      });
    });

    it('calls dispatcher with FETCHING_MOVIES_FAILURE action and error as payload', () => {
      expect(dispatcher.secondCall).to.be.calledWith({
        type: 'FETCHING_MOVIES_FAILURE',
        payload: { error: 'something went wrong with the request' }
      });
    });
  });
});
