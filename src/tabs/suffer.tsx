import "./../../style.css"
import devil from "./../assets/devil.jpeg"
import devil2 from "./../assets/devil2.jpeg"

import Timer from "./../components/Timer";

import { useEffect, useState } from "react";

function SufferPage() {
  // const [hyperNightmareMode, setHyperNightmareMode] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [workout, setWorkout] = useState('');
  const [dDay, setDDay] = useState('');
  const [exp, setExp] = useState(0); // State for experience points
  const [level, setLevel] = useState(1); // State for current level
  const [maxExp, setMaxExp] =useState(1000); // Maximum experience points required for leveling up

  // useEffect(() => {
  //   chrome.storage.local.get('hyperMode', (result) => {
  //     setHyperNightmareMode(result.hyperMode)
  //   })
  // }, [])

    const workoutLogs = [
      'Do 100 Pike Pushups in 3 mins', // sun
      'Do 50 Diamond Pushups in 3 mins', // Mon
      'Do 100 dips in 3 mins',    // Tue
      'Do 100 squats in 3 mins', // Wed
      'Do 100 jump squats in 3 mins', //Thurs
      'Do 100 crunches in 3 mins', // Fri
      'Do 100 Pushups in 3 mins', // Sat
    ]

    const Day = [
      "Shoulder Slaughter Sunday",
      "Muscle tear Monday",
      "Tricep Torture Tuesday",
      "Leg Break Wednesday",
      "Heart Attack Thursday",
      "Abs Annihilation Friday",
      "Chest Crush Saturday"
    ];

    useEffect(() => {
      if (exp >= maxExp) {
        // Level up and reset exp
        setLevel(prevLevel => prevLevel + 1);
        setExp(0);
        setMaxExp(1000 + (level-1)*100);
      }
    }, [exp]);

    useEffect(() => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      setDDay(Day[dayOfWeek]);
      setWorkout(workoutLogs[dayOfWeek]); // workoutLogs[Math.floor(Math.random() * workoutLogs.length)]
      chrome.storage.local.get(["level", "exp"], (result) => {
        setExp(result.exp || 0)
        setLevel(result.level || 1)
      })
    }, [])

    const handleStartTimer = () => {
      setTimerStarted(true);
    };

    // const handleTimerEnd = () => {
    //   // console.log("Congratulations you have successfully failed!")
    //   chrome.storage.local.set({"hyperMode": true})
    //   alert("Congratulations you have successfully failed! \nHyper Nightmare mode activated😈")

    //   chrome.tabs.getCurrent(function(tab) {
    //     chrome.tabs.remove(tab.id);
    //   });
    // }

    const handleSafeChange = () => {
      chrome.storage.local.set({"exp": exp + 100})
      chrome.storage.local.set({"level": level});

      chrome.runtime.sendMessage({ action: "changeSafe", value: true });
      // chrome.storage.local.set({"hyperMode": false})
      chrome.tabs.getCurrent(function(tab) {
        chrome.tabs.remove(tab.id);
      });

    }
    const progressPercentage = (exp / maxExp) * 100;

    return (
      <div className="min-h-screen bg-neutral-800 text-center">
        <div className="absolute top-8 left-12 w-40">
          <p className="flex justify-left text-zinc-200 text-lg ml-2 mb-1">Level {level}</p>
          <div className="bg-gray-300 text-gray-100 text-lg h-5 rounded-xl mb-4">
            <div className="flex justify-left bg-blue-500 h-full rounded-xl" style={{ width: `${progressPercentage}%` }}></div>
            <p className="absolute top-7 left-3">{exp}</p>
          </div>
        </div>

        <div className="flex flex-col p-10 gap-2 text-zinc-200 text-lg justify-center">

          <h1 className="text-3xl mt-4 mb-8">Welcome</h1>
          <p>Looks like you are having a great day 😇</p>
          <p>It's time for you to suffer 😈</p>
          <p className="mt-">See what you have in your bowl</p>
          <img className="mt-4 rounded mx-auto d-block h-80 w-80" src={(devil2)} alt="Devil" />



          {timerStarted ? (
          <>
            <div className="mt-2"></div>
            <Timer duration={180} />  {/* add onTimerEnd={handleTimerEnd} */}
            <p>{workout}</p>
            <div>
              <button
                className="mt-4 text-white bg-[#356299] hover:bg-[#223e61] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 w-40 mb:2"
                onClick={handleSafeChange}
              >
                Finished
              </button>
            </div>

          </>
        ) : (
          <>
            <p className="mt-4">{workout}</p>
            <div className="flex justify-center mt-2">
              
              <button
                className="text-white bg-[#356299] hover:bg-[#223e61] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 w-40 mb:2"
                onClick={handleStartTimer}
              >
                Start
              </button>
            </div>
            {/* <p className="mt-2">{dDay}</p> */}
          </>


        )}
        </div>
      </div>

    )
  }
  
  export default SufferPage
