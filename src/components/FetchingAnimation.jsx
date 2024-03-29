import React from "react";

const FetchingAnimation = ({ text }) => {
  const letters = text.split("").map((letter, index) => (
    <span
      key={index}
      className="animated-letter"
      style={{ "--delay": `${index * 0.15}s` }}
    >
      {letter}
    </span>
  ));

  return <div className="fetching-animation">{letters}</div>;
};

export default FetchingAnimation;
