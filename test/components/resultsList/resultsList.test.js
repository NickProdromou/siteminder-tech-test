import { ComponentTestFactory, createStubComponent } from '../../helpers';
import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const MovieItemStub = createStubComponent({
  displayName: 'PageNavigationStub'
});
const SpinnerStub = createStubComponent({
  displayName: 'SpinnerStub'
});
const ErrorIconStub = createStubComponent({
  displayName: 'ErrorIconStub'
});

const ResultsList = proxyquire(
  '../../../src/components/resultsList/resultsList',
  {
    'react-spinkit': SpinnerStub,
    '../movieItem': MovieItemStub,
    '../icons': { ErrorIcon: ErrorIconStub }
  }
).default;

const testRender = ComponentTestFactory({ Component: ResultsList });

describe('<ResultsList/>', () => {
  describe('with no error and loading is true', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          loading: true,
          results: [],
          error: false
        }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('renders the loading spinner', () => {
      expect(wrapper.find(SpinnerStub).exists()).to.be.true;
    });
  });

  describe('with a list of results no error and loading is false', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          loading: false,
          results: [
            { imdbID: 1 },
            { imdbID: 2 },
            { imdbID: 3 },
            { imdbID: 4 },
            { imdbID: 5 },
            { imdbID: 6 },
            { imdbID: 7 },
            { imdbID: 8 },
            { imdbID: 9 },
            { imdbID: 10 }
          ],
          error: false
        }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('does not render the loading spinner', () => {
      expect(wrapper.find(SpinnerStub).exists()).to.be.false;
    });

    it('renders a <MovieItem/> for each item in the results array', () => {
      wrapper.find(MovieItemStub).forEach((item, index) => {
        expect(item.props()).to.include(testProps.results[index]);
      });
    });
  });

  describe('not loading with no results an error', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          loading: false,
          results: [],
          error: 'Too many results'
        }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('does not render the loading spinner', () => {
      expect(wrapper.find(SpinnerStub).exists()).to.be.false;
    });

    it('does not render any <MovieItem/> components', () => {
      expect(wrapper.find(MovieItemStub)).to.have.length(0);
    });

    it('renders an error icon', () => {
      expect(
        wrapper
          .find('[data-testid="results-list-error"]')
          .find(ErrorIconStub)
          .exists()
      ).to.be.true;
    });

    it('renders the error text', () => {
      expect(
        wrapper
          .find('[data-testid="results-list-error"]')
          .find('p')
          .text()
      ).to.eq(`Movie search returned an error: ${testProps.error}`);
    });
  });
});
