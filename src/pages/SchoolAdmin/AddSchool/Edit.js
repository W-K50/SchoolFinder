import React from "react";

const Edit = () => {
  return (
    <div class="bg-fixed min-h-screen pb-10 ">
      <div>
        <div class="h-80 w-full bg-slate-500 overflow-hidden relative">
          <div class="absolute w-full h-full flex items-center justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            <p
              class="text-lg font-normal text-gray-900 lg:text-xl dark:text-gray-400 ml-2 cursor-pointer"
              onClick={() => console.log("Change Cover photo")}
            >
              Change your cover photo
            </p>
          </div>
          <img
            class=" rounded-lg shadow-xl dark:shadow-gray-800 object-center w-screen"
            src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
            alt="image description"
          />
        </div>
        <div class="container mx-5 md:mx-auto">
          <div class="relative">
            <div class="w-36 h-36 rounded-full overflow-hidden absolute -top-20">
              <div class="absolute w-full h-full flex items-center justify-center">
                <div class=" p-3 rounded-full bg-transparent backdrop-blur-sm border-2 border-gray-400 cursor-pointer hover:backdrop-blur-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              </div>
              <img
                class="align-middle w-36 h-36 "
                src="https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="container px-5 md:mx-auto bg-transparent backdrop-blur-md text-white p-10 border-2 border-gray-600 rounded-xl mt-14">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-100 md:text-5xl lg:text-5xl dark:text-white">
          Edit <span class="text-yellow-400 dark:text-blue-500">School</span>{" "}
          Profile.
        </h1>
        <form>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="School_name"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                School Name
              </label>
              <input
                type="text"
                id="School_name"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="School"
                required
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                required
              />
            </div>
            <div class="col-span-2">
              <label
                for="intro"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Intro about your school
              </label>
              <textarea
                id="intro"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your intro here..."
              ></textarea>
            </div>

            <div>
              <label
                for="mobile"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Mobile #
              </label>
              <input
                type="text"
                id="mobile"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="phone"
                required
              />
            </div>
            <div>
              <label
                for="web"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Website URL
              </label>
              <input
                type="text"
                id="web"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="web"
                required
              />
            </div>
            <div>
              <label
                for="curriculum"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Curriculum
              </label>
              <input
                type="text"
                id="curriculum"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="curriculum"
                required
              />
            </div>
            <div>
              <label
                for="city"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="city"
                required
              />
            </div>
            <div>
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="address"
                required
              />
            </div>
            <div>
              <label
                for="school_code"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                School Code
              </label>
              <input
                type="text"
                id="school_code"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="School Code"
                required
              />
            </div>
            <div>
              <label
                for="fb_url"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Facebook URL
              </label>
              <input
                type="text"
                id="fb_url"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="FB URL"
                required
              />
            </div>
            <div>
              <label
                for="proposal_download_url"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Perposal Download URL
              </label>
              <input
                type="text"
                id="proposal_download_url"
                class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Perposal Download"
                required
              />
            </div>
          </div>

          <div class="flex items-start pb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-100 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                class="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
