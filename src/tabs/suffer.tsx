import "./../../style.css"
import devil from "./../assets/devil2.jpeg"

function SufferPage() {
    const workoutLogs = [
      'Do 100 Pushups in 3 mins',
      'Do 100 crunches in 3 mins',
      'Do 100 situps in 3 mins',
      'Do 100 jump squats in 3 mins',
      'Do 100 dips in 3 mins',
    ]

    const handleSafeChange = () => {
      chrome.runtime.sendMessage({ action: "changeSafe", value: true });
      chrome.tabs.getCurrent(function(tab) {
        chrome.tabs.remove(tab.id);
      });
    }

    return (
      <div className="h-screen bg-neutral-800 text-center">
        <div className="flex flex-col p-10 gap-2 text-zinc-200 text-lg">
          <h1 className="text-3xl">Welcome</h1>
    
          <p>Looks like you are having a great day 😇</p>
          <p>Its time for you to suffer 😈</p>
          <p>Scroll down to see what you have in your bowl</p>
          <img className="rounded mx-auto d-block h-80 w-80" src={devil} alt="Devil" />
          
          <p>{workoutLogs[(Math.floor(Math.random() * workoutLogs.length))]}</p>
          <button className="text-white bg-[#356299] hover:bg-[#223e61] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 w-40 me-2 ml-20 mb:2"
                  onClick={handleSafeChange}>
            Finished
          </button>
        </div>
      </div>

    )
  }
  
  export default SufferPage
