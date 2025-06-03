import React from "react";
import { Link } from "gatsby";
import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = ({ children }) => (
  <div className="app-container">
    <header className="app-header">
      <div className="header-content">
        <span className="clearpayp">clearpayp✓</span>
        <nav>
          <Link className="nav-links" to="/invoice-generator">Create Invoice</Link>
          <Link className="nav-links" to="/currency-converter">Currency Converter</Link>
        </nav>
      </div>
    </header>

    <main className="main-content">{children}</main>

    <footer className="app-footer">
      <span className="clearpayp">clearpayp✓</span>
      <span className="nav-links footer-right">©2025 clearpayp✓. All rights reserved.</span>
    </footer>
  </div>
);

export default Layout;
