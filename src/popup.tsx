import { useState, useEffect } from "react"

function IndexPopup() {
  const [data, setData] = useState("")
  const [count, setCount] = useState(0);


  useEffect(() => {
    let dateTime = new Date();
    let time = dateTime.toLocaleTimeString()
    console.log(Number(time.slice(-2)))
    if (Number(time.slice(-2))<6){
      handleWorkout()
    }

    const timer = setTimeout(() => {
      const counter = count + 1;
      setCount(counter);
    }, 5000);
    return () => clearTimeout(timer);
  }, [count])

  const handleWorkout = () => {alert('Do 100 pushups in 3 mins');
  }

  return (
    <div
      style={{
        padding: 16,
        height: 100,
        width: 200
      }}>
      <h2>
        Start your workout now!
      </h2>
      <button onClick={handleWorkout}>Start</button>
      <button
        onClick={() => {
          chrome.tabs.create({
            url: "./tabs/delta-flyer.html"
          })
        }}>
        open tab page
      </button>
    </div>
  )
}

export default IndexPopup
