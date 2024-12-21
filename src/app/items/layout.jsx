// app/shop/layout.jsx
import React from 'react';



const Layout = ({ children }) => {
  return (
    <div>
      <header>
        {/*<h1>My Shop</h1>*/}
      </header>
      <main>
        {children}
      </main>
      <footer>
        {/*<p>Footer content</p>*/}
      </footer>
    </div>
  );
};

export default Layout;
