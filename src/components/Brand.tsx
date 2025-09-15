import React from "react";
import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <Link to="/" className="inline-flex font-bold text-2xl ">
      <span className="text-cinema-primary">Movie</span>
      <span>X</span>
    </Link>
  );
};

export default Brand;
