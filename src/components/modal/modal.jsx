import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';
import { CloseIcon } from '../icons';

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    closeButtonText: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      mountNode: null
    };
  }

  createMountNode = () => {
    const modalTarget = document.createElement('div');
    modalTarget.classList.add(styles.Root);
    modalTarget.setAttribute('data-testid', 'modal-mount-node');
    document.body.appendChild(modalTarget);

    this.setState({ mountNode: modalTarget });
  };

  componentDidMount() {
    document.body.classList.add(styles.modalOpen);

    this.createMountNode();
  }

  componentWillUnmount() {
    const { mountNode } = this.state;

    document.body.classList.remove(styles.modalOpen);
    document.body.removeChild(mountNode);
  }

  handleClose = event => {
    event.stopPropagation();
    const { onClose } = this.props;

    onClose();
  };

  render() {
    const { mountNode } = this.state;

    if (false === this.props.render instanceof Function) {
      return null;
    }

    if (false === this.props.onClose instanceof Function) {
      return null;
    }

    return (
      mountNode &&
      createPortal(
        <div className={styles.modalContainer} data-testid="modal-root-element">
          <div className={styles.modalHeader}>
            <button
              className={styles.closeButton}
              data-testid="modal-close-button"
              onClick={this.handleClose}
            >
              <CloseIcon className={styles.closeIcon} />
            </button>
          </div>
          {this.props.render()}
        </div>,
        mountNode
      )
    );
  }
}
