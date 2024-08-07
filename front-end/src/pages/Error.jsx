import React from "react";

const Error = () => {
  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="card p-4 shadow-sm">
        <h1 className="display-4 mb-4 text-center">Sorry! Page Not Found</h1>
        <p className="lead text-center">
          Visit our <a href="/">home page</a>
        </p>
      </div>
    </div>
  );
};

export default Error;
