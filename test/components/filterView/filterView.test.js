import { ComponentTestFactory, createStubComponent } from '../../helpers';
import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const PageNavigationStub = createStubComponent({
  displayName: 'PageNavigationStub'
});
const ResultsListStub = createStubComponent({
  displayName: 'ResultsListStub'
});
const SearchStub = createStubComponent({
  displayName: 'SearchStub'
});

const { DumbFilterView: FilterView } = proxyquire(
  '../../../src/components/filterView/filterView',
  {
    '../pageNavigation': PageNavigationStub,
    '../resultsList': ResultsListStub,
    '../search': SearchStub
  }
);

const testRender = ComponentTestFactory({ Component: FilterView });

describe('<FilterView/>', () => {
  describe('when receiving all props', () => {
    let wrapper;
    let testProps;

    before(() => {
      [wrapper, testProps] = testRender({
        props: {
          onInput: sinon.stub(),
          clearResults: sinon.stub(),
          items: [{ item: '1' }, { item: '2' }],
          loading: false,
          error: null,
          hasNextPage: true,
          hasPrevPage: true,
          pageNumber: 4,
          totalCount: 200,
          getNextPage: sinon.stub(),
          getPrevPage: sinon.stub(),
          searchTerm: 'some string'
        }
      });
    });

    it('passes the correct props to <Search/>', () => {
      expect(wrapper.find(SearchStub).props()).to.deep.include({
        onInput: testProps.onInput,
        clearResults: testProps.clearResults
      });
    });

    it('passes the correct props to <ResultsList/>', () => {
      expect(wrapper.find(ResultsListStub).props()).to.deep.include({
        results: testProps.items,
        loading: testProps.loading,
        error: testProps.error
      });
    });

    it('passes the correct props to <PageNavigation/>', () => {
      expect(wrapper.find(PageNavigationStub).props()).to.deep.include({
        hasNextPage: testProps.hasNextPage,
        hasPrevPage: testProps.hasPrevPage,
        pageNumber: testProps.pageNumber,
        totalCount: testProps.totalCount,
        getNextPage: testProps.getNextPage,
        getPrevPage: testProps.getPrevPage,
        searchTerm: testProps.searchTerm
      });
    });
  });
});
