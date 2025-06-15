import React from "react";
import { Link } from "gatsby";
import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = ({ children }) => (
  <div className="app-container">
    <header className="app-header">
      <div className="header-content">
        <span className="text-p2-v3 font--primary text-fw-regular text-clr-primary">clearpayp✓</span>
        <nav>
          <Link className="text-p2 font--primary text-fw-medium text-clr-primary" to="/invoice-generator">Create Invoice</Link>
          <Link className="text-p2 font--primary text-fw-medium text-clr-primary" to="/currency-converter">Currency Converter</Link>
        </nav>
      </div>
    </header>

    <main className="main-content">{children}</main>

    <footer className="app-footer">
      <span className="text-p2-v3 font--primary text-fw-regular">clearpayp✓</span>
      <span className="text-p2 font--primary text-fw-medium text-clr-primary footer-right">©2025 clearpayp✓. All rights reserved.</span>
    </footer>
  </div>
);

export default Layout;
