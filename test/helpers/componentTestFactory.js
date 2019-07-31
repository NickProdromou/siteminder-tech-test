import { shallow, mount } from 'enzyme';
import React from 'react';

export default function ComponentTestFactory({
  Component,
  baseProps = {},
  baseContext = {},
  renderMethod = 'shallow'
} = {}) {
  return ({ props = {}, context = {} } = {}) => {
    const testProps = {
      ...baseProps,
      ...props
    };

    const testContext = {
      ...baseContext,
      ...context
    };

    let method = shallow;

    if (renderMethod === 'mount') {
      method = mount;
    }

    return [
      method(<Component {...props} />, { context: testContext }),
      testProps,
      testContext
    ];
  };
}
