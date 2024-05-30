// eslint-disable-next-line no-unused-vars
import React from "react";

const Loading = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-t-4 border-blue-500 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-full h-full border-t-4 border-green-500 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-full h-full border-t-4 border-red-500 rounded-full animate-spin"></div>
    </div>
    <p className="mt-4 text-gray-600">Loading...</p>
  </div>
);

export default Loading;
