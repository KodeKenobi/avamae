import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About us" },
    { path: "/contact-us", label: "Contact us" },
  ];

  const handleHeaderClick = () => {
    console.log("Header clicked, current state:", isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log("New state will be:", !isMobileMenuOpen);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header" onClick={handleHeaderClick}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <img src="/Logo.svg" alt="Avamae Logo" className="logo-img" />
            </div>
          </div>

          <nav className="navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  location.pathname === item.path
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                {item.label}
              </Link>
            ))}
            <button className="btn btn-signin">Sign in</button>
          </nav>

          <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
            <div className="mobile-menu-content">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={
                    location.pathname === item.path
                      ? "mobile-nav-link active"
                      : "mobile-nav-link"
                  }
                  onClick={handleNavClick}
                >
                  {item.label}
                </Link>
              ))}
              <button className="mobile-btn-signin">Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
