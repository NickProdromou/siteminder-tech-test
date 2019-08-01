import {
  ComponentTestFactory,
  createStubComponent,
  propTypeWarningFilter,
  restorePropTypeWarnings
} from '../../helpers';
import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const ChevronLeftStub = createStubComponent({ displayName: 'ChevronLeftStub' });
const ChevronRightStub = createStubComponent({
  displayName: 'ChevronRightStub'
});

const PageNavigation = proxyquire(
  '../../../src/components/pageNavigation/pageNavigation',
  {
    '../icons': {
      ChevronLeft: ChevronLeftStub,
      ChevronRight: ChevronRightStub
    }
  }
).default;

const testRender = ComponentTestFactory({ Component: PageNavigation });

describe('<PageNavigation/>', () => {
  describe('with valid props and a next and previous page', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          hasNextPage: true,
          hasPrevPage: true,
          pageNumber: 2,
          totalCount: '150',
          getNextPage: sinon.stub(),
          getPrevPage: sinon.stub(),
          searchTerm: 'bee movie'
        }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('renders the page number from the props', () => {
      expect(wrapper.find('[data-testid="pageNumber"]').text()).to.include(
        testProps.pageNumber
      );
    });

    it('renders the total count from the props', () => {
      expect(wrapper.find('[data-testid="totalCount"]').text()).to.include(
        testProps.totalCount
      );
    });

    it('renders a previous button', () => {
      expect(wrapper.find(ChevronLeftStub).exists()).to.be.true;
    });

    it('renders a next button', () => {
      expect(wrapper.find(ChevronRightStub).exists()).to.be.true;
    });
  });

  describe('with valid props and clicking on the previous page button', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          hasNextPage: true,
          hasPrevPage: true,
          pageNumber: 2,
          totalCount: '150',
          getNextPage: sinon.stub(),
          getPrevPage: sinon.stub(),
          searchTerm: 'indiana jones'
        }
      });

      wrapper.find('[data-testid="prev-page-button"]').simulate('click');
    });

    it('calls the getPreviousPage prop as a function passing the page number and searchTerm', () => {
      expect(testProps.getPrevPage).to.be.calledWith(
        testProps.searchTerm,
        testProps.pageNumber
      );
    });
  });

  describe('with valid props and clicking on the next page button', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          hasNextPage: true,
          hasPrevPage: true,
          pageNumber: 2,
          totalCount: '150',
          getNextPage: sinon.stub(),
          getPrevPage: sinon.stub(),
          searchTerm: 'bee movie'
        }
      });

      wrapper.find('[data-testid="next-page-button"]').simulate('click');
    });

    it('calls the getNextPage prop as a function passing the page number and searchTerm', () => {
      expect(testProps.getNextPage).to.be.calledWith(
        testProps.searchTerm,
        testProps.pageNumber
      );
    });
  });

  describe('with valid props and hasNextPage as false', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          hasNextPage: false,
          hasPrevPage: true,
          pageNumber: 2,
          totalCount: '150',
          getNextPage: sinon.stub(),
          getPrevPage: sinon.stub(),
          searchTerm: 'bee movie'
        }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('renders the page number from the props', () => {
      expect(wrapper.find('[data-testid="pageNumber"]').text()).to.include(
        testProps.pageNumber
      );
    });

    it('renders the total count from the props', () => {
      expect(wrapper.find('[data-testid="totalCount"]').text()).to.include(
        testProps.totalCount
      );
    });

    it('renders a previous button', () => {
      expect(wrapper.find(ChevronLeftStub).exists()).to.be.true;
    });

    it('does not render a next button', () => {
      expect(wrapper.find(ChevronRightStub).exists()).to.be.false;
    });
  });

  describe('with valid props and hasPrevPage as false', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          hasNextPage: true,
          hasPrevPage: false,
          pageNumber: 2,
          totalCount: '150',
          getNextPage: sinon.stub(),
          getPrevPage: sinon.stub(),
          searchTerm: 'bee movie'
        }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('renders the page number from the props', () => {
      expect(wrapper.find('[data-testid="pageNumber"]').text()).to.include(
        testProps.pageNumber
      );
    });

    it('renders the total count from the props', () => {
      expect(wrapper.find('[data-testid="totalCount"]').text()).to.include(
        testProps.totalCount
      );
    });

    it('renders a previous button', () => {
      expect(wrapper.find(ChevronLeftStub).exists()).to.be.false;
    });

    it('does not render a next button', () => {
      expect(wrapper.find(ChevronRightStub).exists()).to.be.true;
    });
  });

  describe('with valid props and no page number', () => {
    let wrapper;
    let testProps;

    before(() => {
      propTypeWarningFilter();

      [wrapper, testProps] = testRender({
        props: {
          hasNextPage: true,
          hasPrevPage: false,
          pageNumber: null,
          totalCount: '0',
          getNextPage: sinon.stub(),
          getPrevPage: sinon.stub(),
          searchTerm: 'the matrix'
        }
      });
    });

    after(restorePropTypeWarnings);

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('does not render a page number', () => {
      expect(wrapper.find('[data-testid="pageNumber"]').exists()).to.be.false;
    });

    it('does not renders the total count', () => {
      expect(wrapper.find('[data-testid="totalCount"]').exists()).to.be.false;
    });
  });
});
