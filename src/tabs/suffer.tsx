import "./../../style.css"
import devil from "./../assets/devil.jpeg"
import devil2 from "./../assets/devil2.jpeg"

import Timer from "./../components/Timer";

import { useEffect, useState } from "react";

function SufferPage() {
  // const [hyperNightmareMode, setHyperNightmareMode] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [workout, setWorkout] = useState('');

  // useEffect(() => {
  //   chrome.storage.local.get('hyperMode', (result) => {
  //     setHyperNightmareMode(result.hyperMode)
  //   })
  // }, [])

    const workoutLogs = [
      'Do 100 Pushups in 3 mins',
      'Do 100 crunches in 3 mins',
      'Do 100 situps in 3 mins',
      'Do 100 jump squats in 3 mins',
      'Do 100 dips in 3 mins',
    ]

  useEffect(() => {
    setWorkout(workoutLogs[Math.floor(Math.random() * workoutLogs.length)])
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
      chrome.runtime.sendMessage({ action: "changeSafe", value: true });
      // chrome.storage.local.set({"hyperMode": false})
      chrome.tabs.getCurrent(function(tab) {
        chrome.tabs.remove(tab.id);
      });

    }

    return (
      <div className="h-screen bg-neutral-800 text-center">
        <div className="flex flex-col p-10 gap-2 text-zinc-200 text-lg justify-center">
          <h1 className="text-3xl mt-4 mb-8">Welcome</h1>
    
          <p>Looks like you are having a great day 😇</p>
          <p>Its time for you to suffer 😈</p>
          <p className="mt-">See what you have in your bowl</p>
          <img className="mt-2 rounded mx-auto d-block h-80 w-80" src={(devil2)} alt="Devil" />


          {timerStarted ? (
          <>
            <div className="mt-2"></div>
            <Timer duration={180} />  {/* add onTimerEnd={handleTimerEnd} */}
            <p>{workout}</p>
            <button
              className="mt-8 text-white bg-[#356299] hover:bg-[#223e61] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 w-40 me-2 ml-20 mb:2"
              onClick={handleSafeChange}
            >
              Finished
            </button>
          </>
        ) : (
          <>
            <p className="mt-6">{workout}</p>
            <div className="flex justify-center mt-2">
              
              <button
                className="text-white bg-[#356299] hover:bg-[#223e61] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 w-40 me-2 mb:2"
                onClick={handleStartTimer}
              >
                Start
              </button>
            </div>
          </>


        )}
        </div>
      </div>

    )
  }
  
  export default SufferPage
