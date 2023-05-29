import React from "react";

const ErrorAlert = ({ message, onClick }) => {
  return (
    <div
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400  flex items-center justify-between"
      role="alert"
    >
      <div>
        <span class="font-medium">Danger alert! </span>
        <span>Try Again {message}</span>
      </div>
      <svg
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};

export default ErrorAlert;
