import proxyquire, { noCallThru } from 'proxyquire';
import { ComponentTestFactory, createStubComponent } from '../../helpers';

noCallThru();

const MovieSummaryStub = createStubComponent({});
const MoviePosterImageStub = createStubComponent({
  displayName: 'MoviePosterImage'
});
const SpinnerStub = createStubComponent({
  displayName: 'Spinner'
});
const ErrorIconStub = createStubComponent({
  displayName: 'ErrorIconStub'
});

const MovieDetail = proxyquire(
  '../../../src/components/movieDetail/movieDetail',
  {
    './movieSummary': MovieSummaryStub,
    './moviePosterImage': MoviePosterImageStub,
    'react-spinkit': SpinnerStub,
    '../icons': { ErrorIcon: ErrorIconStub }
  }
).default;

const testRender = ComponentTestFactory({ Component: MovieDetail });

describe('<MovieDetail/>', () => {
  describe('has no error with all props and not loading', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          title: 'Some title',
          genres: 'a b c d e',
          plot: 'the plot of the movie called Some Title etc',
          imageUrl: 'http://imageurl.com',
          language: 'Russian',
          actors: 'the tsar',
          duration: 'quite long',
          year: 2019,
          error: false,
          loading: false
        }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('renders the movie title text from the title prop', () => {
      expect(wrapper.find('[data-testid="movie-detail-title"]').text()).to.eq(
        testProps.title
      );
    });

    it('renders the genres text from the genres prop', () => {
      expect(
        wrapper.find('[data-testid="movie-detail-genres-text"]').text()
      ).to.eq(testProps.genres);
    });

    it('renders the plot text from the plot prop', () => {
      expect(
        wrapper.find('[data-testid="movie-detail-plot-text"]').text()
      ).to.eq(testProps.plot);
    });

    it('passes the correct props through to the <MovieSummary/>', () => {
      expect(wrapper.find(MovieSummaryStub).props()).to.deep.eq({
        language: testProps.language,
        actors: testProps.actors,
        duration: testProps.duration,
        year: testProps.year,
        children: []
      });
    });

    it('passes the correct props through to the <MoviePoserImage/>', () => {
      expect(wrapper.find(MoviePosterImageStub).props()).to.deep.eq({
        title: testProps.title,
        imageUrl: testProps.imageUrl,
        children: []
      });
    });
  });

  describe('has an error and is not loading', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          error: 'Error displaying movie details',
          title: 'Some title',
          genres: 'a b c d e',
          plot: 'the plot of the movie called Some Title etc',
          imageUrl: 'http://imageurl.com',
          language: 'Russian',
          actors: 'the tsar',
          year: 1234,
          duration: 'quite long',
          loading: false
        }
      });
    });

    it('renders the error icon', () => {
      expect(
        wrapper
          .find('[data-testid="movie-detail-error"]')
          .find(ErrorIconStub)
          .exists()
      ).to.be.true;
    });

    it('renders the error', () => {
      expect(
        wrapper
          .find('[data-testid="movie-detail-error"]')
          .find('p')
          .text()
      ).to.eq(`Loading movie details encountered an error:${testProps.error}`);
    });
  });

  describe('is loading', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          title: 'Some title',
          genres: 'a b c d e',
          plot: 'the plot of the movie called Some Title etc',
          imageUrl: 'http://imageurl.com',
          language: 'Russian',
          actors: 'the tsar',
          year: 1234,
          duration: 'quite long',
          loading: true,
          error: false
        }
      });
    });

    it('renders the loading state', () => {
      expect(
        wrapper
          .find('[data-testid="movie-detail-loading"]')
          .find(SpinnerStub)
          .exists()
      ).to.be.true;
    });
  });
});
