import React from 'react';
import PropTypes from 'prop-types';
import Breakpoint from 'react-socks';

export default function DetailRenderer() {
  return (
    <React.Fragment>
      <Breakpoint small only>
        Modal
      </Breakpoint>
      <Breakpoint medium up>
        desktop view
      </Breakpoint>
    </React.Fragment>
  );
}
