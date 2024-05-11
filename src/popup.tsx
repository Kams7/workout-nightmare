import { useState, useEffect } from "react"
import "./../style.css"


function IndexPopup() {
  const [data, setData] = useState("")
  const [time, setTime] = useState("00:00");

  const handleWorkout = () => {
    chrome.tabs.create({
      url: "./tabs/suffer.html"
    })
  }

  useEffect(() => {
    // Fetch the initial value of sufferTime from storage and set it in the state
    chrome.storage.local.get(["sufferTime"], function(result) {
      if (result.sufferTime !== undefined) {
        setTime(`${String(result.sufferTime.hours).padStart(2, '0')}:${String(result.sufferTime.minutes).padStart(2, '0')}`);
      }
      // console.log(time);
    });
  }, []);

  const changeSafe = () => {
    chrome.runtime.sendMessage({ action: "changeSafe", value: false });
  }

  const changeSufferTime = () => {
    const [hours, minutes] = time.split(":");
    chrome.runtime.sendMessage({ action: "changeSufferTime", value: { hours: parseInt(hours), minutes: parseInt(minutes) } });
  }

  return (
    <div className="bg-slate-950 w-64 text-white text-base p-6">
      <h2 className="mb-4">
        Start your workout now!
      </h2>
      <button className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2"
        onClick={handleWorkout}>
        Start
      </button>
      <button className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2"
       onClick={changeSafe}>Reset Day</button>

      <h2 className="mt-4">
        Change time for workout
      </h2>
      <div className="flex items-center">
        <input type="time" value={time} onChange={(e) => {setTime(e.target.value)}} className="mt-2 w-full px-3 py-2 text-base text-white placeholder-gray-400 bg-[#24292F] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 focus:ring-opacity-50" />
        <button onClick={changeSufferTime} className="mt-2 px-4 py-2 ml-2 bg-[#4B5563] text-white hover:bg-[#4B5563]/90 focus:outline-none focus:ring-2 focus:ring-[#4B5563] rounded-lg">Set</button>
      </div>
    </div>
  )
}

export default IndexPopup
