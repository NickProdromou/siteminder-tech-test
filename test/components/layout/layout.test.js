import React from 'react';
import Layout from '../../../src/components/layout';
import { createStubComponent, ComponentTestFactory } from '../../helpers';

const testRender = ComponentTestFactory({ Component: Layout });

describe('<Layout/>', () => {
  describe('when passed a SideBar and a Main prop', () => {
    let wrapper;
    let SideBarSlot;
    let MainSlot;

    before(() => {
      SideBarSlot = createStubComponent();
      MainSlot = createStubComponent();

      [wrapper] = testRender({
        props: {
          SideBar: <SideBarSlot />,
          Main: <MainSlot />
        }
      });
    });

    it('renders to the page', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('renders the SideBar into the aside slot', () => {
      expect(
        wrapper
          .find('[data-testid="layout-side-slot"]')
          .childAt(0)
          .is(SideBarSlot)
      ).to.be.true;
    });

    it('renders the Main into the main slot', () => {
      expect(
        wrapper
          .find('[data-testid="layout-main-slot"]')
          .childAt(0)
          .is(MainSlot)
      ).to.be.true;
    });
  });
});
