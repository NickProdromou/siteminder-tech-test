import {
  getMovieItems,
  getTotalCount,
  getPageNumber,
  getSearchTerm,
  getLoadingState,
  getErrorState,
  showNextPageButton,
  showPreviousPageButton
} from '../../src/selectors/movieList';

describe('movieList selectors', () => {
  describe('getMovieItems', () => {
    describe('when passed valid state', () => {
      let state;
      let returnValue;

      before(() => {
        state = {
          movieList: {
            items: [{ item: '1' }]
          }
        };
        returnValue = getMovieItems(state);
      });

      it('returns the expected derived state', () => {
        expect(returnValue).to.deep.eq(state.movieList.items);
      });
    });
  });

  describe('getTotalCount', () => {
    describe('when passed valid state', () => {
      let state;
      let returnValue;

      before(() => {
        state = {
          movieList: { totalCount: 120 }
        };
        returnValue = getTotalCount(state);
      });

      it('returns the expected derived state', () => {
        expect(returnValue).to.deep.eq(state.movieList.totalCount);
      });
    });
  });

  describe('getPageNumber', () => {
    describe('when passed valid state', () => {
      let state;
      let returnValue;

      before(() => {
        state = { movieList: { currentPage: 21 } };
        returnValue = getPageNumber(state);
      });

      it('returns the expected derived state', () => {
        expect(returnValue).to.deep.eq(state.movieList.currentPage);
      });
    });
  });

  describe('getSearchTerm', () => {
    describe('when passed valid state', () => {
      let state;
      let returnValue;

      before(() => {
        state = { movieList: { searchTerm: 'Donnie Darko' } };
        returnValue = getSearchTerm(state);
      });

      it('returns the expected derived state', () => {
        expect(returnValue).to.deep.eq(state.movieList.searchTerm);
      });
    });
  });

  describe('getLoadingState', () => {
    describe('when passed valid state', () => {
      let state;
      let returnValue;

      before(() => {
        state = { movieList: { loading: true } };
        returnValue = getLoadingState(state);
      });

      it('returns the expected derived state', () => {
        expect(returnValue).to.deep.eq(state.movieList.loading);
      });
    });
  });

  describe('getErrorState', () => {
    describe('when passed valid state', () => {
      let state;
      let returnValue;

      before(() => {
        state = {
          movieList: { error: 'bad request' }
        };
        returnValue = getErrorState(state);
      });

      it('returns the expected derived state', () => {
        expect(returnValue).to.deep.eq(state.movieList.error);
      });
    });
  });

  describe('showNextPageButton', () => {
    describe('when total count is greater than 10 and there are exactly 10 movies', () => {
      let state;
      let returnValue;

      before(() => {
        state = {
          movieList: {
            totalCount: 30,
            items: [
              { item: 1 },
              { item: 2 },
              { item: 3 },
              { item: 4 },
              { item: 5 },
              { item: 6 },
              { item: 7 },
              { item: 8 },
              { item: 9 },
              { item: 10 }
            ]
          }
        };
        returnValue = showNextPageButton(state);
      });

      it('should show the next page', () => {
        expect(returnValue).to.be.true;
      });
    });

    describe('when total count is greater than 10 and there are less than 10 movies', () => {
      let state;
      let returnValue;

      before(() => {
        state = {
          movieList: {
            totalCount: 30,
            items: [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }]
          }
        };
        returnValue = showNextPageButton(state);
      });

      it('should not show the next page', () => {
        expect(returnValue).to.be.false;
      });
    });

    describe('when total count is less than 10 and there are less than 10 movies', () => {
      let state;
      let returnValue;

      before(() => {
        state = {
          movieList: {
            totalCount: 4,
            items: [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }]
          }
        };
        returnValue = showNextPageButton(state);
      });

      it('should not show the next page', () => {
        expect(returnValue).to.be.false;
      });
    });
  });

  describe('showPreviousPageButton', () => {
    describe('when page number is greater than 1', () => {
      let state;
      let returnValue;

      before(() => {
        state = {
          movieList: {
            currentPage: 3
          }
        };
        returnValue = showPreviousPageButton(state);
      });

      it('should show previous page', () => {
        expect(returnValue).to.deep.eq(true);
      });
    });

    describe('when page number is 1', () => {
      let state;
      let returnValue;

      before(() => {
        state = {
          movieList: {
            currentPage: 1
          }
        };
        returnValue = showPreviousPageButton(state);
      });

      it('should not show previous page', () => {
        expect(returnValue).to.deep.eq(false);
      });
    });
  });
});
