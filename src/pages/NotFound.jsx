/* eslint-disable no-unused-vars */
import React from "react";
import { Result, Button } from "antd";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" href="/dashboard" className="mt-4">
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
