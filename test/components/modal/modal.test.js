import React from 'react';
import proxyquire, { noCallThru } from 'proxyquire';
import {
  createStubComponent,
  ComponentTestFactory,
  propTypeWarningFilter,
  restorePropTypeWarnings
} from '../../helpers';

noCallThru();

const CloseIconStub = createStubComponent({ displayName: 'CloseIcon' });

const Modal = proxyquire('../../../src/components/modal/modal', {
  '../icons': {
    CloseIcon: CloseIconStub
  }
}).default;

const testRender = ComponentTestFactory({
  Component: Modal,
  renderMethod: 'mount'
});

describe('<Modal/>', () => {
  describe('when passed a render function', () => {
    let wrapper;
    let modalContentTestId;
    let InnerComponent;

    before(() => {
      modalContentTestId = 'modal-inner-div';
      InnerComponent = createStubComponent({ displayName: 'modalContent' });

      [wrapper] = testRender({
        props: {
          onClose: sinon.stub(),
          render: () => (
            <div data-testid={modalContentTestId}>
              <InnerComponent />
            </div>
          )
        }
      });
    });

    after(() => {
      wrapper.unmount();
    });

    it('renders to the page correctly', () => {
      expect(wrapper.isEmptyRender()).to.be.false;
    });

    it('creates a portal on the document body', () => {
      expect(document.querySelector('[data-testid="modal-mount-node"]')).to
        .exist;
    });

    it('renders the Modal content into the appended div on the document body', () => {
      const mountedNode = document.querySelector(
        '[data-testid="modal-mount-node"]'
      );

      expect(mountedNode.querySelector(`[data-testid=${modalContentTestId}]`))
        .to.exist;
    });

    it('renders a CloseIcon in a button', () => {
      expect(
        wrapper
          .find('[data-testid="modal-close-button"]')
          .find(CloseIconStub)
          .exists()
      ).to.be.true;
    });

    it('populates the portal with the result of the render prop function', () => {
      expect(
        wrapper
          .find('Portal')
          .find(InnerComponent)
          .exists()
      ).to.be.true;
    });
  });

  describe('when not passed a valid render function', () => {
    let wrapper;

    before(() => {
      propTypeWarningFilter();

      [wrapper] = testRender({
        props: {
          onClose: sinon.stub()
        }
      });
    });

    after(() => {
      wrapper.unmount();

      restorePropTypeWarnings();
    });

    it('does not render', () => {
      expect(wrapper.isEmptyRender()).to.be.true;
    });
  });

  describe('when not passed a valid onClose function', () => {
    let wrapper;

    before(() => {
      propTypeWarningFilter();

      [wrapper] = testRender({
        props: {
          render: () => <div />
        }
      });
    });

    after(() => {
      wrapper.unmount();

      restorePropTypeWarnings();
    });

    it('does not render', () => {
      expect(wrapper.isEmptyRender()).to.be.true;
    });
  });
});
