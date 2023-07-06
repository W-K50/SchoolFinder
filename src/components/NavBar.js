import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const NavBar = ({ school }) => {
  const [dropMenu, setDropMenu] = useState(false);

  const AuthState = useSelector((state) => state.Auth_Reducer.users);

  const router = useRouter();

  return (
    <>
      <nav
        class=" backdrop-blur-lg border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900
      "
      >
        <div
          class={`bg-gray-900 opacity-5 w-full h-screen absolute right-0 top-0 z-10 ${
            dropMenu ? "block" : "hidden"
          }`}
          onClick={() => setDropMenu(false)}
        ></div>
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <a class="flex items-center">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              School Finder
            </span>
          </a>
          <div class="flex items-center md:order-2">
            {school && AuthState.id ? (
              <button
                type="button"
                class="flex mr-3 text-sm bg-blue-600 rounded-md md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 p-3 text-white"
                onClick={() => {
                  localStorage.removeItem("AuthID");
                  location.assign("/Auth");
                }}
              >
                Log Out
              </button>
            ) : (
              <button
                type="button"
                class="flex mr-3 text-sm bg-blue-600 rounded-md md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 p-3 text-white"
                onClick={() => {
                  location.assign("/Auth");
                }}
              >
                Login as Admin
              </button>
            )}

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={() => {
                setDropMenu((oldState) => setDropMenu(!oldState));
              }}
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            class={`items-center justify-between ${
              dropMenu ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="mobile-menu-2"
          >
            <ul class="flex flex-col p-2 mt-4 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-xl md:font-medium md:border-1  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  class="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 md:hover:text-blue-600 bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white"
                  aria-current="page"
                  onClick={() => router.push("/")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  class="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={() => router.push("/aboutUs")}
                >
                  About
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Pricing
                </a>
              </li> */}
              <li>
                <a
                  class="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={() => router.push("/contactUs")}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
