import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './components/layout';
import './style/global.scss';
import store from './reducers';
import FilterView from './components/filterView';
import DetailRenderer from './components/detailRenderer';
import { setDefaultBreakpoints, BreakpointProvider } from 'react-socks';

setDefaultBreakpoints([
  { small: 375 },
  { medium: 768 },
  { large: 992 },
  { extraLlarge: 1200 }
]);

ReactDOM.render(
  <Provider store={store}>
    <BreakpointProvider>
      <Layout SideBar={<FilterView />} Main={<DetailRenderer />} />
    </BreakpointProvider>
  </Provider>,
  document.getElementById('root')
);
