import React, { useState } from "react";
import logo from "../img/logo.jpg";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-orange-100 ">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/home" className="-m-1.5 p-1.5">
            <span className="sr-only">Chefcitoos</span>
            <img
              className="h-16 w-auto rounded-full"
              src={logo}
              alt="logo-app"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/home"
            className={`text-md font-semibold leading-6 text-gray-900 hover:text-orange-600 hover:border-b-2 border-orange-600 ${
              location.pathname === "/home"
                ? "active border-b-2 border-orange-600 text-orange-600"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className={`text-md font-semibold leading-6 text-gray-900 hover:text-orange-600 hover:border-b-2 border-orange-600 ${
              location.pathname === "/menu"
                ? "active border-b-2 border-orange-600 text-orange-600"
                : ""
            }`}
          >
            Menú
          </Link>
          <Link
            to="/creaciones"
            className={`text-md font-semibold leading-6 text-gray-900 hover:text-orange-600 hover:border-b-2 border-orange-600 ${
              location.pathname === "/creaciones"
                ? "active border-b-2 border-orange-600 text-orange-600"
                : ""
            }`}
          >
            Creaciones
          </Link>
          <Link
            to="/nosotros"
            className={`text-md font-semibold leading-6 text-gray-900 hover:text-orange-600 hover:border-b-2 border-orange-600 ${
              location.pathname === "/nosotros"
                ? "active border-b-2 border-orange-600 text-orange-600"
                : ""
            }`}
          >
            Nosotros
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="bg-white rounded-full flex justify-center items-center mr-4 w-12">
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <button className="bg-orange-600 w-28 h-12 text-white rounded-xl font-bold mr-4">
            Logout
          </button>
          <div className="bg-gray-200 rounded-full flex justify-center items-center w-12">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-10">{/* Background backdrop */}</div>
      )}
      <div
        className={`${
          isOpen ? "fixed" : "hidden"
        } inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <Link to="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto rounded-full" src={logo} alt="" />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <div className="-mx-3">
                <div className="mt-2 space-y-2" id="disclosure-1">
                  <a
                    href="#"
                    className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                  >
                    Menú
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                  >
                    Creaciones
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
                  >
                    Nosotros
                  </a>
                </div>
              </div>
            </div>
            <div className="py-6">
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
