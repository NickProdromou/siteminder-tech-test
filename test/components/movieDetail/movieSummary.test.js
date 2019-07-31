import MovieSummary from '../../../src/components/movieDetail/movieSummary';

import { ComponentTestFactory } from '../../helpers';

const testRender = ComponentTestFactory({ Component: MovieSummary });

describe('<MovieSummary/>', () => {
  describe('with all props', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          language: 'English',
          actors: 'Joe Perosn',
          duration: 'long'
        }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    ['language', 'actors', 'duration'].forEach(prop => {
      it(`renders the ${prop} text`, () => {
        expect(
          wrapper.find(`[data-test-id="movie-summary-${prop}"]`).text()
        ).to.eq(`${prop}:${testProps[prop]}`);
      });
    });
  });

  describe('with no props', () => {
    let wrapper;

    before(() => {
      [wrapper] = testRender();
    });

    it('renders an empty div to the page', () => {
      expect(wrapper.at(0).exists()).to.be.true;
    });
  });

  describe('with some props', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          language: 'English',
          actors: 'Joe Person'
        }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    ['language', 'actors'].forEach(prop => {
      it(`renders the ${prop} text`, () => {
        expect(
          wrapper.find(`[data-test-id="movie-summary-${prop}"]`).text()
        ).to.eq(`${prop}:${testProps[prop]}`);
      });
    });

    it('does not render the duration', () => {
      expect(wrapper.find('[data-test-id="movie-summary-duration"]').exists())
        .to.be.false;
    });
  });
});
