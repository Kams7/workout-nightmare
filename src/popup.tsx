import { useState, useEffect } from "react"
import "./../style.css"


function IndexPopup() {
  const [data, setData] = useState("")
  const [count, setCount] = useState(0);

  const handleWorkout = () => {
    chrome.tabs.create({
      url: "./tabs/suffer.html"
    })
  }

  const changeSafe = () => {
    chrome.runtime.sendMessage({ action: "changeSafe", value: false });
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
    </div>
  )
}

export default IndexPopup
