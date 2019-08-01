import React from 'react';
import PropTypes from 'prop-types';
import styles from './layout.module.scss';

export default function Layout({ SideBar, Main }) {
  return (
    <div className={styles.Root}>
      <aside data-testid="layout-side-slot" className={styles.asideContainer}>
        {SideBar}
      </aside>
      <div data-testid="layout-main-slot" className={styles.mainContainer}>
        {Main}
      </div>
    </div>
  );
}

Layout.propTypes = {
  SideBar: PropTypes.node.isRequired,
  Main: PropTypes.node.isRequired
};
