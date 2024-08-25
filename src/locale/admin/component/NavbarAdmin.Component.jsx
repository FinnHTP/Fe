import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometer,
  faLaptop,
  faTh,
  faKeyboard,
  faTable,
  faChartBar,
  faFile,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NavbarAdminComponent = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="flex items-center justify-center p-4 bg-gray-800">
        <h3 className="text-2xl text-primary flex items-center">
          <i className="fa fa-user-edit mr-2"></i>ADMIN
        </h3>
      </div>
      <nav className="flex flex-col space-y-2 mt-6 px-4">
        <Link
          to="/admin/account"
          className="flex items-center p-2 hover:bg-gray-800 rounded transition-all duration-200"
        >
          <FontAwesomeIcon icon={faTachometer} className="text-primary mr-3" />
          <span>Account</span>
        </Link>
        <div className="relative group">
          <button className="flex items-center p-2 w-full hover:bg-gray-800 rounded transition-all duration-200 focus:outline-none">
            <FontAwesomeIcon icon={faLaptop} className="text-primary mr-3" />
            <span>Elements</span>
            <i className="ml-auto fa fa-caret-down"></i>
          </button>
          <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-gray-800 rounded shadow-lg z-10">
            <Link
              to="/admin/game"
              className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
            >
              Game
            </Link>
            <Link
              to="/admin/gametypes"
              className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
            >
              GameTypes
            </Link>
            <Link
              to="/admin/gamesystem"
              className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
            >
              GameSystem
            </Link>
            <Link
              to="/admin/rankaccount"
              className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
            >
              RankAccount
            </Link>
            <Link
              to="/admin/order"
              className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
            >
              Order
            </Link>
          </div>
        </div>
        <Link
          to="/admin/widget"
          className="flex items-center p-2 hover:bg-gray-800 rounded transition-all duration-200"
        >
          <FontAwesomeIcon icon={faTh} className="text-primary mr-3" />
          <span>Widget</span>
        </Link>
        <Link
          to="/admin/group"
          className="flex items-center p-2 hover:bg-gray-800 rounded transition-all duration-200"
        >
          <FontAwesomeIcon icon={faKeyboard} className="text-primary mr-3" />
          <span>Group</span>
        </Link>
        <Link
          to="/admin/keycodes"
          className="flex items-center p-2 hover:bg-gray-800 rounded transition-all duration-200"
        >
          <FontAwesomeIcon icon={faTable} className="text-primary mr-3" />
          <span>Keycodes</span>
        </Link>
        <Link
          to="/admin/chart"
          className="flex items-center p-2 hover:bg-gray-800 rounded transition-all duration-200"
        >
          <FontAwesomeIcon icon={faChartBar} className="text-primary mr-3" />
          <span>Charts</span>
        </Link>
        <div className="relative group">
          <button className="flex items-center p-2 w-full hover:bg-gray-800 rounded transition-all duration-200 focus:outline-none">
            <FontAwesomeIcon icon={faFile} className="text-primary mr-3" />
            <span>Pages</span>
            <i className="ml-auto fa fa-caret-down"></i>
          </button>
          <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-gray-800 rounded shadow-lg z-10">
            <Link
              to="/signup"
              className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
            >
              Sign Up
            </Link>
            <Link
              to="/404"
              className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
            >
              404 Error
            </Link>
            <Link
              to="/blank"
              className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200"
            >
              Blank Page
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarAdminComponent;
