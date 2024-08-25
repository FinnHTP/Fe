import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometer,
  faLaptop,
  faKeyboard,
  faTable,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NavbarAdminComponent = () => {
  const [isElementsOpen, setElementsOpen] = useState(false);

  const toggleElementsDropdown = () => {
    setElementsOpen(!isElementsOpen);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="flex items-center justify-center p-4 bg-gray-800">
        <h3 className="text-2xl text-primary flex items-center">
          <i className="fa fa-user-edit mr-2"></i>ADMIN
        </h3>
      </div>
      <nav className="flex flex-col space-y-2 mt-6 px-4">
        <Link
          to="/api/account"
          className="flex items-center p-2 hover:bg-gray-800 rounded transition-all duration-200"
        >
          <FontAwesomeIcon icon={faTachometer} className="text-primary mr-3" />
          <span>Account</span>
        </Link>
        <div className="relative">
          <button
            className="flex items-center p-2 w-full hover:bg-gray-800 rounded transition-all duration-200 focus:outline-none"
            onClick={toggleElementsDropdown}
          >
            <FontAwesomeIcon icon={faLaptop} className="text-primary mr-3" />
            <span>Elements</span>
            <i className={`ml-auto fa fa-caret-${isElementsOpen ? 'up' : 'down'}`}></i>
          </button>
          {isElementsOpen && (
            <div className="absolute left-0 top-full mt-2 bg-gray-800 rounded shadow-lg z-10">
              <Link
                to="/api/game"
                className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
              >
                Game
              </Link>
              <Link
                to="/api/gametypes"
                className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
              >
                GameTypes
              </Link>
              <Link
                to="/api/gamesystem"
                className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
              >
                GameSystem
              </Link>
              <Link
                to="/api/rankaccount"
                className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
              >
                RankAccount
              </Link>
              <Link
                to="/api/order"
                className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
              >
                Order
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/api/group"
          className="flex items-center p-2 hover:bg-gray-800 rounded transition-all duration-200"
        >
          <FontAwesomeIcon icon={faKeyboard} className="text-primary mr-3" />
          <span>Group</span>
        </Link>
        <Link
          to="/api/keycodes"
          className="flex items-center p-2 hover:bg-gray-800 rounded transition-all duration-200"
        >
          <FontAwesomeIcon icon={faTable} className="text-primary mr-3" />
          <span>Keycodes</span>
        </Link>
        <Link
          to="/api/chart"
          className="flex items-center p-2 hover:bg-gray-800 rounded transition-all duration-200"
        >
          <FontAwesomeIcon icon={faChartBar} className="text-primary mr-3" />
          <span>Charts</span>
        </Link>
      </nav>
    </div>
  );
};

export default NavbarAdminComponent;
