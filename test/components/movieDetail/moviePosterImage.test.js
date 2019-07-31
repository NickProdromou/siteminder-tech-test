import MoviePosterImage from '../../../src/components/movieDetail/moviePosterImage';

import {
  ComponentTestFactory,
  propTypeWarningFilter,
  restorePropTypeWarnings
} from '../../helpers';

const testRender = ComponentTestFactory({ Component: MoviePosterImage });

describe('<MoviePosterImage/>', () => {
  describe('with all valid props', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: { imageUrl: 'http://some-image-url', title: 'some movie title' }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('sets the src on the img from the imageUrl prop', () => {
      expect(wrapper.find('img').prop('src')).to.eq(testProps.imageUrl);
    });

    it('sets the alt on the img from the title prop', () => {
      expect(wrapper.find('img').prop('alt')).to.eq(testProps.title);
    });
  });

  describe('when not passed an image url', () => {
    let wrapper;

    before(() => {
      propTypeWarningFilter();

      [wrapper] = testRender({
        props: { title: 'some movie title without an image' }
      });
    });

    after(() => {
      restorePropTypeWarnings();
    });

    it('does not render', () => {
      expect(wrapper.isEmptyRender()).to.be.true;
    });
  });

  describe('when not passed a title', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: { imageUrl: 'http://some-image-url' }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('sets the src on the img from the imageUrl prop', () => {
      expect(wrapper.find('img').prop('src')).to.eq(testProps.imageUrl);
    });

    it('sets the alt on the img from the title prop', () => {
      expect(wrapper.find('img').prop('alt')).to.eq(
        MoviePosterImage.defaultProps.title
      );
    });
  });
});
