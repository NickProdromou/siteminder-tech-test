import { shallow } from 'enzyme';
import React from 'react';

export default function ComponentTestFactory({
  Component,
  baseProps = {},
  baseContext = {}
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

    return [
      shallow(<Component {...props} />, { context: testContext }),
      testProps,
      testContext
    ];
  };
}
