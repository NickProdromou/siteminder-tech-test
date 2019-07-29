import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function createStubComponent({
  props = {},
  displayName = 'Stub',
  children = false
} = {}) {
  return class extends Component {
    static displayName = displayName;

    static propTypes = {
      children: PropTypes.any
    };

    static defaultProps = {
      children: []
    };

    render() {
      return React.createElement('div', {
        ...props,
        ...this.props,
        ...(children && { children: this.props.children })
      });
    }
  };
}
