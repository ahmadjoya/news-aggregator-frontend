import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { Transition } from "@headlessui/react";
import SearchFilter from "../search/search-filter";
import { useCookies } from "react-cookie";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookies, removeCookie] = useCookies(["auth"]);
  const toggleMenu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };
  const auth = cookies["auth"];

  return (
    <nav className="max-w-[120rem] m-auto bg-white shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 flex-grow">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="h-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
            </Link>
          </div>

          <div className="hidden sm:block sm:ml-6">
            <SearchFilter />
            {/* {authValue} */}
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                  <span className="ml-2 font-medium">
                    {auth?.user?.name ? auth?.user?.name : "Login/Register"}
                  </span>
                </button>
                <Transition
                  show={isDropdownOpen}
                  enter="transition ease-out duration-100 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg">
                    {auth.access_token ? (
                      <div className="py-1 rounded-md bg-white shadow-xs">
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Settings
                        </Link>
                        <Link
                          to="/preferences"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Preferences
                        </Link>
                        <div
                          onClick={() => removeCookie("auth")}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        >
                          Log out
                        </div>
                      </div>
                    ) : (
                      <div className="py-1 rounded-md bg-white shadow-xs">
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </div>
                </Transition>
              </div>
            </div>
          </div>
          <div className="sm:hidden ml-6">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => toggleMenu()}
            >
              <span className="sr-only">Open main menu</span>
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {auth.access_token ? (
              <>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Settings
                </Link>
                <Link
                  to="/preferences"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Preferences
                </Link>
                <div
                  onClick={() => removeCookie("auth")}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
                >
                  Log out
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Register
                </Link>
              </>
            )}

            <div className="relative">
              <SearchFilter />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Header;
