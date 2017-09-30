import React from 'react';

import './Layout.scss';

export const Layout = ({ children }) => (
  <div className="centered">
    <section className="cards">
      {children}
    </section>
  </div>
);

export default Layout;
