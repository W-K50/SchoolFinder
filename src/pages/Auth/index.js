import { Login, Register, sendResetPasswordEmail } from "@/Config/Urls";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth_Data,
  getSchoolProfile_Data,
} from "@/Store/Auth_State/Auth_Actions";
import { useRouter } from "next/router";
import EmailVerification from "@/components/EmailVerification";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import ErrorAlert from "@/components/Alerts/ErrorAlert";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Authentication = () => {
  const [username, setUsername] = useState("ali1");
  const [email, setEmail] = useState("user9@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [cpassword, setcPassword] = useState("123456789");
  const [role, setRole] = useState(false);

  // Password Error

  const [passwordError, setPasswordError] = useState("");

  // Forget Email and code Input

  const [forgetemail, setForgerEmail] = useState("user9@gmail.com");
  const [forgetCode, setForgerCode] = useState("78545");

  // Show and hide forget email Component

  const [ShowforgetEmail, setShowForgetEmail] = useState(false);
  const [emailSend, setEmailSend] = useState(false);

  // Password Visibility
  const [showPass, setShowPass] = useState(false);

  // Toggle Registeration login and Loading
  const [register, setRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Email Verification
  const [emailVerified, setEmailVerified] = useState(false);

  const AuthState = useSelector((state) => state.Auth_Reducer.users);

  useEffect(() => {
    const AuthID = localStorage.getItem("AuthID");
    if (AuthID !== null) {
      router.replace("/SchoolAdmin");
    } else {
      return;
    }
  }, []);

  // Alerts
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const AuthRegister = async () => {
    setIsLoading(true);
    await axios
      .post(Register, {
        username: username,
        email: email,
        password: password,
      })
      .then((resp) => {
        console.log(resp.data);
        dispatch(getAuth_Data(resp.data.message));
        dispatch(getSchoolProfile_Data(resp.data.message.SchoolProfile));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const AuthLogin = async () => {
    setIsLoading(true);
    await axios
      .post(Login, {
        email: email,
        password: password,
      })
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("AuthID", resp.data.response.id);
        setErrorAlert(false);
        setSuccessAlert(true);
        dispatch(getAuth_Data(resp.data.response));
        dispatch(getSchoolProfile_Data(resp.data.response.SchoolProfile));
        setIsLoading(false);
        router.replace("/SchoolAdmin/");
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsLoading(false);
        setErrorAlert(true);
        setSuccessAlert(false);
        setErrorMessage(error.response.data?.error.message);
      });
  };

  useEffect(() => {
    if (password.length !== 0) {
      if (register) {
        if (password === cpassword) {
          setPasswordError("");
        } else {
          setPasswordError("Password Not Matched.");
        }
      }
    }
  }, [password, cpassword]);

  return (
    <div className="h-screen  mb-20">
      <section className="h-screen">
        <div class={"sticky top-0 z-50"}>
          {successAlert && (
            <SuccessAlert onClick={() => setSuccessAlert(false)} />
          )}
        </div>
        <div class={"sticky top-0 z-50"}>
          {errorAlert && (
            <ErrorAlert
              onClick={() => setErrorAlert(false)}
              message={errorMessage}
            />
          )}
        </div>
        {/* {!emailVerified && (
        <EmailVerification setEmailVerified={setEmailVerified} />
      )} */}
        {ShowforgetEmail && (
          <div
            class={`w-full h-screen absolute flex items-center justify-center`}
          >
            <div
              class="bg-gray-900 w-full h-screen absolute opacity-75"
              onClick={() => {
                setShowForgetEmail(false);
                setEmailSend(false);
              }}
            ></div>
            <div class="w-96  bg-gray-900 absolute p-5 rounded-md">
              <h1 class="text-2xl text-white my-3">Forget Password</h1>
              {ShowforgetEmail && (
                <div>
                  <label
                    for="forgetemail"
                    class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
                  >
                    Enter Your Email
                  </label>
                  <input
                    type="email"
                    name="forgetemail"
                    id="forgetemail"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    value={forgetemail}
                    onChange={(text) => setForgerEmail(text.target.value)}
                  />
                  <div>
                    <button
                      type="button"
                      class=" mt-3 flex mr-3 text-sm bg-blue-600 rounded-md md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 p-3 text-white"
                      onClick={async () => {
                        await axios
                          .post(sendResetPasswordEmail, {
                            email: forgetemail,
                          })
                          .then((resp) => {
                            console.log(resp.data);
                            setShowForgetEmail(false);
                          })
                          .catch((error) => {
                            console.log(error.response.data);
                          });
                      }}
                    >
                      Send Verification Link
                    </button>
                  </div>
                </div>
              )}
              {emailSend && (
                <div>
                  <label
                    for="forgetcode"
                    class="block mb-2 text-sm font-medium text-gray-100 dark:text-white mt-3"
                  >
                    Enter Forget Code
                  </label>
                  <input
                    type="text"
                    name="forgetcode"
                    id="forgetcode"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="545415"
                    required=""
                    value={forgetCode}
                    onChange={(text) => setForgerCode(text.target.value)}
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
              )}
              <div>
                <button
                  type="button"
                  class=" mt-3 flex mr-3 text-sm bg-gray-600 rounded-md md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 p-3 text-white"
                  onClick={() => {
                    setShowForgetEmail(false);
                    setEmailSend(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <NavBar />
        <div>
          <div class="  text-gray-900 flex justify-center">
            <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
              <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div class="mt-12 flex flex-col items-center">
                  <h1 class="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
                  <div class="w-full flex-1 mt-8">
                    <div class="mx-auto max-w-xs">
                      {register && (
                        <div>
                          <label
                            for="username"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Username
                          </label>
                          <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="username"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(text) => setUsername(text.target.value)}
                          />
                        </div>
                      )}
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          placeholder="Email"
                          value={email}
                          onChange={(text) => setEmail(text.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="password"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5"
                        >
                          Password
                        </label>
                        <div class={"flex bg-gray-50 rounded-lg items-center"}>
                          <input
                            type={showPass ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
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
                      {register && (
                        <div>
                          <label
                            for="cpassword"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5"
                          >
                            Confirm Password
                          </label>
                          <input
                            type={showPass ? "text" : "password"}
                            name="cpassword"
                            id="cpassword"
                            placeholder="••••••••"
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                            value={cpassword}
                            onChange={(text) => setcPassword(text.target.value)}
                          />
                        </div>
                      )}
                      <div class="flex items-center justify-between mt-5">
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input
                              id="remember"
                              aria-describedby="remember"
                              type="checkbox"
                              class=" w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                              required=""
                            />
                          </div>
                          <div class="ml-3 text-sm">
                            <label
                              for="remember"
                              class="text-gray-500 dark:text-gray-300"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <a
                          href="#"
                          class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-900"
                          onClick={() => setShowForgetEmail(true)}
                        >
                          Forgot password?
                        </a>
                      </div>
                      {isLoading ? (
                        <button
                          disabled
                          type="button"
                          class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                          class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                          onClick={() => {
                            if (register) {
                              AuthRegister();
                            } else {
                              AuthLogin();
                            }
                          }}
                        >
                          <svg
                            class="w-6 h-6 -ml-2"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <path d="M20 8v6M23 11h-6" />
                          </svg>
                          <span class="ml-3">
                            {!register ? "Sign In" : "Sign up"}
                          </span>
                        </button>
                      )}

                      <p class="text-sm font-light text-gray-500 dark:text-gray-400 mt-5">
                        Don’t have an account yet?{" "}
                        <a
                          class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                          onClick={() => {
                            setRegister((oldState) => setRegister(!oldState));
                          }}
                        >
                          {register ? "Sign In" : "Sign up"}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div
                  class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=648&q=80')",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default Authentication;
