import React from "react";

import "../CSS/circle.css";

const Circle = ({ label, onClick }) => {
  return (
    <div className="circle-container" onClick={(e) => onClick(e)}>
      <p>{label}</p>
    </div>
  );
};

export default Circle;
