import React, { useState, useEffect } from "react";

const Timer = ({ duration }) => { // add , onTimerEnd 
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          // if (onTimerEnd) {
          //   onTimerEnd();
          // }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration]); // add onTimerEnd

  const calculateProgress = () => {
    return (1- timeLeft / duration) * 314; // Adjusted for 314 (2πr) strokeDasharray
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-full h-full">
            <circle
              className="text-transparent stroke-current"
              cx="64"
              cy="65"
              r="50"
              fill="none"
              strokeWidth="6"
              strokeDasharray="314"
              strokeDashoffset={calculateProgress()}
              style={{ stroke: "lightblue", strokeLinecap: "round"}} // Adjusted stroke color for dark background
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              fill="white"
              fontSize="28px" // Adjusted font size
              fontWeight="bold"
              dy=".4em"
            >
              {timeLeft}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Timer;
