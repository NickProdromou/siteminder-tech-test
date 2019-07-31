import proxyquire, { noCallThru } from 'proxyquire';
import { createStubComponent, ComponentTestFactory } from '../../helpers';

noCallThru();

const Search = proxyquire('../../../src/components/search/index', {
  '../icons/search': createStubComponent({ displayName: 'SearchIcon' })
}).default;

const testRender = ComponentTestFactory({ Component: Search });

describe('<Search/>', () => {
  describe('with valid props', () => {
    let wrapper;

    before(() => {
      [wrapper] = testRender({ props: { onInput: sinon.stub() } });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('renders the input', () => {
      expect(wrapper.find('[data-testid="searchInput"]').exists()).to.be.true;
    });

    it('renders the <SearchIcon/>', () => {
      expect(wrapper.find('SearchIcon').exists()).to.be.true;
    });
  });

  describe('when input is changed', () => {
    let wrapper;
    let testProps;
    let newStateValue;

    before(() => {
      [wrapper, testProps] = testRender({ props: { onInput: sinon.stub() } });

      newStateValue = 'star wars';

      wrapper
        .find('[data-testid="searchInput"]')
        .simulate('change', { target: { value: newStateValue } });
    });

    it('sets the state to the new value', () => {
      expect(wrapper.state()).to.deep.eq({
        searchText: newStateValue
      });
    });

    it('calls the onInput callback with the updated state', done => {
      setTimeout(() => {
        expect(testProps.onInput).to.be.calledWith(newStateValue);

        done();
      }, 1000);
    });
  });
});
