import React from 'react';
import { FaPizzaSlice } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Tuduist icon" />
        </div>
        <div className="settings">
          <ul>
            <li>+</li>
            <li>
              <span>
                <FaPizzaSlice />
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
