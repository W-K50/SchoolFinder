import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";

const contactUs = () => {
  return (
    <>
      <NavBar />
      <section class="text-gray-600 body-font relative">
        <div class="container px-10 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div class="h-screen w-full bg-gray-600 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              class="absolute inset-0"
              frameborder="0"
              title="map"
              marginheight="0"
              marginwidth="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52814.02451121818!2d73.1947395095005!3d34.17507426615729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de3111557ac517%3A0x6e59a635b12e952c!2sAbbottabad%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1685265742575!5m2!1sen!2s width='600' height='450'  loading='lazy' referrerpolicy='no-referrer-when-downgrade'"
            ></iframe>
            <div class="w-full bg-white relative flex flex-wrap py-6 rounded shadow-md">
              <div class="lg:w-1/2 px-6">
                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p class="mt-1">
                  Photo booth tattooed prism, portland taiyaki hoodie neutra
                  typewriter
                </p>
              </div>
              <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  EMAIL
                </h2>
                <a class="text-red-500 leading-relaxed">example@email.com</a>
                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                  PHONE
                </h2>
                <p class="leading-relaxed">123-456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default contactUs;
