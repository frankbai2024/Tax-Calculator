import "./App.css";
import React from "react";

const Bracket = ({ start, end, base, rate }) => {
  return (
    <div className="bracket flex justify-between items-center ">
      <div>
        <span className="income-range text-sm text-gray-600 ml-40">
          ${start} - ${end}
        </span>
        {/* <br /> */}
      </div>
      <span className="text-xl text-blue-600 mt-2 mr-4 ml-4">
        {rate}% + ${base}
        {/* ${base} plus {rate}c for each $1 over ${start} */}
      </span>

      {/*  
      <div className="border border-red-300 rounded-lg p-2 ">
        {rate}%
      </div>
      */}
    </div>
  );
};

export default Bracket;