import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';
import { CloseIcon } from '../icons';

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired
  };

  static defaultProps = {
    isOpen: false
  };

  constructor() {
    super();

    this.state = {
      mountNode: null
    };
  }

  createMountNode() {
    const modalTarget = document.createElement('div');
    Object.assign(modalTarget, { className: styles.Root });
    document.body.appendChild(modalTarget);

    this.setState({ mountNode: modalTarget });
  }

  componentDidMount() {
    document.body.classList.add(styles.modalOpen);

    this.createMountNode();
  }

  componentWillUnmount() {
    const { mountNode } = this.state;

    document.body.classList.remove(styles.modalOpen);
    window.removeEventListener('keydown', this.listenForEsc, true);
    document.body.removeChild(mountNode);
  }

  handleClose = event => {
    event.stopPropagation();
    const { onClose } = this.props;

    onClose();
  };

  render() {
    const { mountNode } = this.state;

    return (
      mountNode &&
      createPortal(
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <button onClick={this.handleClose}>
              <CloseIcon />
            </button>
          </div>
          {this.props.render(this.handleClose)}
        </div>,
        mountNode
      )
    );
  }
}
