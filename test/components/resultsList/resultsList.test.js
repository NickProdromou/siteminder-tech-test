import { ComponentTestFactory, createStubComponent } from '../../helpers';
import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const MovieItemStub = createStubComponent({
  displayName: 'PageNavigationStub'
});
const SpinnerStub = createStubComponent({
  displayName: 'ResultsListStub'
});

const ResultsList = proxyquire(
  '../../../src/components/resultsList/resultsList',
  {
    'react-spinkit': SpinnerStub,
    '../movieItem': MovieItemStub
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
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 },
            { id: 10 }
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

    it('renders the error text', () => {
      expect(wrapper.find('[data-testid="results-list-error"]').text()).to.eq(
        testProps.error
      );
    });
  });
});
