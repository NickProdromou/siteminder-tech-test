import proxyquire, { noCallThru } from 'proxyquire';
import { createStubComponent, ComponentTestFactory } from '../../helpers';

noCallThru();

const MovieItem = proxyquire('../../../src/components/movieItem/movieItem', {
  '../icons/star': createStubComponent({ displayName: 'StarIcon' })
}).default;

const testRender = ComponentTestFactory({ Component: MovieItem });

describe('<MovieItem/>', () => {
  describe('with valid props and item is not selected', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          Title: 'A movie title',
          Year: '2015',
          isSelected: false,
          getMovieDetail: sinon.stub(),
          clearMovieDetail: sinon.stub()
        }
      });
    });

    it('renders into the dom', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('renders the title text using the props into the correct location', () => {
      expect(wrapper.find('[data-testid="title-text"]').text()).to.eq(
        testProps.Title
      );
    });

    it('renders the release year using the prop in the correct location', () => {
      expect(wrapper.find('[data-testid="release-year-text"]').text()).to.eq(
        testProps.Year
      );
    });

    it('does not render the <StarIcon/> component', () => {
      expect(wrapper.find('StarIcon').exists()).to.be.false;
    });
  });

  describe('with valid props and item is selected', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          Title: 'A movie title',
          Year: '2015',
          isSelected: true,
          getMovieDetail: sinon.stub(),
          clearMovieDetail: sinon.stub()
        }
      });
    });

    it('renders into the dom', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('renders the title text using the props into the correct location', () => {
      expect(wrapper.find('[data-testid="title-text"]').text()).to.eq(
        testProps.Title
      );
    });

    it('renders the release year using the prop in the correct location', () => {
      expect(wrapper.find('[data-testid="release-year-text"]').text()).to.eq(
        testProps.Year
      );
    });

    it('renders the <StarIcon/> component', () => {
      expect(wrapper.find('StarIcon').exists()).to.be.true;
    });
  });

  describe('with valid props and item is selected when item is clicked', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          Title: 'A movie title',
          Year: '2015',
          isSelected: true,
          imdbID: 12452,
          getMovieDetail: sinon.stub(),
          clearMovieDetail: sinon.stub()
        }
      });

      wrapper.find('article').simulate('click');
    });

    it('renders into the dom', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('renders the title text using the props into the correct location', () => {
      expect(wrapper.find('[data-testid="title-text"]').text()).to.eq(
        testProps.Title
      );
    });

    it('renders the release year using the prop in the correct location', () => {
      expect(wrapper.find('[data-testid="release-year-text"]').text()).to.eq(
        testProps.Year
      );
    });

    it('renders the <StarIcon/> component', () => {
      expect(wrapper.find('StarIcon').exists()).to.be.true;
    });

    it('calls the clear movie detail function with the imdbID', () => {
      expect(testProps.clearMovieDetail).to.be.calledWith(testProps.imdbID);
    });
  });

  describe('with valid props and item is not selected when item is clicked', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          Title: 'A movie title',
          Year: '2015',
          isSelected: false,
          imdbID: 12452,
          getMovieDetail: sinon.stub(),
          clearMovieDetail: sinon.stub()
        }
      });

      wrapper.find('article').simulate('click');
    });

    it('renders into the dom', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('renders the title text using the props into the correct location', () => {
      expect(wrapper.find('[data-testid="title-text"]').text()).to.eq(
        testProps.Title
      );
    });

    it('renders the release year using the prop in the correct location', () => {
      expect(wrapper.find('[data-testid="release-year-text"]').text()).to.eq(
        testProps.Year
      );
    });

    it('does not render the <StarIcon/> component', () => {
      expect(wrapper.find('StarIcon').exists()).to.be.false;
    });

    it('calls the get movie detail function with the imdbID', () => {
      expect(testProps.getMovieDetail).to.be.calledWith(testProps.imdbID);
    });
  });
});
