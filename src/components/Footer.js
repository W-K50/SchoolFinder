import React from "react";

const Footer = () => {
  return (
    <section class="py-6 bg-gray-100 text-gray-900 mt-10">
      <div class="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row">
        <div class="flex flex-col justify-center lg:text-left">
          <p class="mb-1 text-sm font-medium tracking-widest uppercase text-gray-600">
            Download our app. It&apos;s Free
          </p>
          <h1 class="py-2 text-3xl font-medium leading-tight title-font">
            School Finder
          </h1>
        </div>
        <div class="flex flex-col items-center justify-center flex-shrink-0 mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end">
          <button class="inline-flex items-center px-6 py-3 rounded-lg bg-gray-600 text-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
              baseProfile="basic"
            >
              <linearGradient
                id="AraffhWwwEqZfgFEBZFoqa"
                x1="18.102"
                x2="25.297"
                y1="3.244"
                y2="34.74"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#35ab4a" />
                <stop offset=".297" stop-color="#31a145" />
                <stop offset=".798" stop-color="#288739" />
                <stop offset="1" stop-color="#237a33" />
              </linearGradient>
              <path
                fill="url(#AraffhWwwEqZfgFEBZFoqa)"
                d="M13.488,4.012C10.794,2.508,7.605,3.778,6.45,6.323L24.126,24l9.014-9.014L13.488,4.012z"
              />
              <linearGradient
                id="AraffhWwwEqZfgFEBZFoqb"
                x1="19.158"
                x2="21.194"
                y1="23.862"
                y2="66.931"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#f14e5d" />
                <stop offset=".499" stop-color="#ea3d4f" />
                <stop offset="1" stop-color="#e12138" />
              </linearGradient>
              <path
                fill="url(#AraffhWwwEqZfgFEBZFoqb)"
                d="M33.14,33.014L24.126,24L6.45,41.677 c1.156,2.546,4.345,3.815,7.038,2.312L33.14,33.014z"
              />
              <linearGradient
                id="AraffhWwwEqZfgFEBZFoqc"
                x1="32.943"
                x2="36.541"
                y1="14.899"
                y2="43.612"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#ffd844" />
                <stop offset=".519" stop-color="#ffc63f" />
                <stop offset="1" stop-color="#ffb03a" />
              </linearGradient>
              <path
                fill="url(#AraffhWwwEqZfgFEBZFoqc)"
                d="M41.419,28.393 c1.72-0.96,2.58-2.676,2.581-4.393c-0.001-1.717-0.861-3.434-2.581-4.393l-8.279-4.621L24.126,24l9.014,9.014L41.419,28.393z"
              />
              <linearGradient
                id="AraffhWwwEqZfgFEBZFoqd"
                x1="13.853"
                x2="15.572"
                y1="5.901"
                y2="42.811"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".003" stop-color="#0090e6" />
                <stop offset="1" stop-color="#0065a0" />
              </linearGradient>
              <path
                fill="url(#AraffhWwwEqZfgFEBZFoqd)"
                d="M6.45,6.323C6.168,6.948,6,7.652,6,8.408 v31.179c0,0.761,0.164,1.463,0.45,2.09l17.674-17.68L6.45,6.323z"
              />
            </svg>
            <span class="flex flex-col items-start ml-4 leading-none">
              <span class="mb-1 text-xs">GET IT ON</span>
              <span class="font-semibold title-font">Google Play</span>
            </span>
          </button>
          <button class="inline-flex items-center px-5 py-3 rounded-lg bg-gray-600 text-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
              fill="white"
            >
              <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z" />
            </svg>
            <span class="flex flex-col items-start ml-4 leading-none">
              <span class="mb-1 text-xs">Download on the</span>
              <span class="font-semibold title-font">App Store</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Footer;
