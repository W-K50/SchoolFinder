import React, { useState } from "react";

const EmailVerification = ({ setEmailVerified }) => {
  const [emailVerifyCode, setemailVerifyCode] = useState("");

  return (
    <div class={`w-full h-screen absolute flex items-center justify-center`}>
      <div
        class="bg-gray-900 w-full h-screen absolute opacity-75"
        onClick={() => {
          setEmailVerified(true);
        }}
      ></div>
      <div class="w-96  bg-gray-900 absolute p-5 rounded-md">
        <h1 class="text-2xl text-white my-3">Email Verification</h1>

        <div>
          <label
            for="forgetcode"
            class="block mb-2 text-sm font-medium text-gray-100 dark:text-white mt-3"
          >
            Enter Code
          </label>
          <input
            type="number"
            name="forgetcode"
            id="forgetcode"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="545415"
            required=""
            value={emailVerifyCode}
            onChange={(text) => setemailVerifyCode(text.target.value)}
          />
          <div>
            <button
              type="button"
              class=" mt-3 flex mr-3 text-sm bg-blue-600 rounded-md md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 p-3 text-white"
            >
              Submit
            </button>
          </div>
        </div>

        <div>
          <button
            type="button"
            class=" mt-3 flex mr-3 text-sm bg-gray-600 rounded-md md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 p-3 text-white"
            onClick={() => {
              setEmailVerified(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
