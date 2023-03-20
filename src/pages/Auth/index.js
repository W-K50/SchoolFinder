import { Login, Register } from "@/Config/Urls";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth_Data,
  getSchoolProfile_Data,
} from "Store/Auth_State/Auth_Actions";
import { useRouter } from "next/router";
import EmailVerification from "@/components/EmailVerification";

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

  const dispatch = useDispatch();
  const router = useRouter();

  const AuthRegister = async () => {
    // setIsLoading(true);
    // await axios
    //   .post(Register, {
    //     username: username,
    //     email: email,
    //     password: password,
    //     role: role,
    //   })
    //   .then((resp) => {
    //     console.log(resp.data);
    //     dispatch(getAuth_Data(resp.data.message));
    //     dispatch(getSchoolProfile_Data(resp.data.message.SchoolProfile));
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setIsLoading(false);
    //   });
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
        dispatch(getAuth_Data(resp.data.response));
        dispatch(getSchoolProfile_Data(resp.data.response.SchoolProfile));
        setIsLoading(false);
        if (resp.data.response.isSchoolAdmin) {
          router.replace("/SchoolAdmin/");
        } else {
          router.replace("/Student");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
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
    <section>
      {!emailVerified && (
        <EmailVerification setEmailVerified={setEmailVerified} />
      )}
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
                    onClick={() => setEmailSend(true)}
                  >
                    Send Code
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
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full  rounded-lg shadow-2xl  border-gray-900 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div class="space-y-4 md:space-y-6">
              {register && (
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    value={username}
                    onChange={(text) => setUsername(text.target.value)}
                  />
                </div>
              )}
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={email}
                  onChange={(text) => setEmail(text.target.value)}
                />
              </div>
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

              {register && (
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
              )}
              {register && (
                <div>
                  <label
                    for="role"
                    class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
                  >
                    Roles
                  </label>
                  <select
                    id="role"
                    class="w-full rounded-md"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option value={false}>Student</option>
                    <option value={true}>School Admin</option>
                  </select>
                </div>
              )}
              <p class="text-red-500">{passwordError}</p>
              <div class="flex items-center justify-between">
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
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-100"
                  onClick={() => setShowForgetEmail(true)}
                >
                  Forgot password?
                </a>
              </div>
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
                    if (register) {
                      AuthRegister();
                    } else {
                      AuthLogin();
                    }
                  }}
                >
                  {!register ? "Sign In" : "Sign up"}
                </button>
              )}
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
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
    </section>
  );
};

export default Authentication;
