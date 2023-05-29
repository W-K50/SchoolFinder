import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import { changePassword } from "@/Config/Urls";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ForgetPassword = () => {
  const [password, setPassword] = useState("123456789");
  const [cpassword, setcPassword] = useState("123456789");

  // Password Error

  const [passwordError, setPasswordError] = useState("");

  // Password Visibility
  const [showPass, setShowPass] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const ChangePassword = async () => {
    setIsLoading(true);
    const emaildata = router.asPath.split("email=")[1];
    await axios
      .post(changePassword, {
        email: emaildata,
        password: password,
      })
      .then((resp) => {
        console.log(resp.data);
        setIsLoading(false);
        setSuccessAlert(true);
        setErrorAlert(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response.data);
        setSuccessAlert(false);
        setErrorAlert(true);
      });
  };

  useEffect(() => {
    if (password.length !== 0) {
      if (password === cpassword) {
        setPasswordError("");
      } else {
        setPasswordError("Password Not Matched.");
      }
    }
  }, [password, cpassword]);

  // Alerts
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  return (
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class={"sticky top-0 z-50"}>
        {successAlert && (
          <SuccessAlert onClick={() => setSuccessAlert(false)} />
        )}
      </div>
      <div class={"sticky top-0 z-50"}>
        {errorAlert && <ErrorAlert onClick={() => setErrorAlert(false)} />}
      </div>
      <div class="w-full  rounded-lg shadow-2xl  border-gray-900 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Password
              </label>
              <div class={"flex bg-gray-50 rounded-lg"}>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class=" text-gray-900 sm:text-sm  block w-full p-2.5 border-0 bg-transparent"
                  required=""
                  value={password}
                  onChange={(text) => setPassword(text.target.value)}
                />
                <div
                  class={" p-2 rounded-md cursor-pointer"}
                  onClick={() =>
                    setShowPass((oldState) => setShowPass(!oldState))
                  }
                >
                  {showPass ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                for="cpassword"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="cpassword"
                id="cpassword"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={cpassword}
                onChange={(text) => setcPassword(text.target.value)}
              />
            </div>
            <p class="text-red-500">{passwordError}</p>

            {isLoading ? (
              <button
                disabled
                type="button"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center justify-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500 "
                onClick={() => {
                  ChangePassword();
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
