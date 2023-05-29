import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div>
      <div class="w-full min-h-screen">{children}</div>
    </div>
  );
};

export default Wrapper;
{
  /* <div class="bg-bg_img bg-no-repeat bg-cover bg-fixed ">
      <div class="w-full min-h-screen bg-transparent backdrop-blur-md ">
        {children}
      </div>
    </div> */
}
