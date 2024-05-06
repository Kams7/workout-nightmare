let safe = false
let sufferUrl = chrome.runtime.getURL("tabs/suffer.html")

function initializeVariables(callback) {
  chrome.storage.local.get(["lastDate", "isSafe"], function (result) {
    const full_today = new Date();
    full_today.setHours(full_today.getHours() - 17);

    const today = full_today.toLocaleDateString();


    if (result.lastDate !== today) {
      // Update the date in storage
      chrome.storage.local.set({ "lastDate": today });
      chrome.storage.local.set({ "isSafe": false });
      safe = false;
    } else {
      safe = result.isSafe;
    }
    callback();
  });
}

initializeVariables(function() {


  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "changeSafe") {
      safe = message.value;
      // console.log("Safe updated to:", safe);
      chrome.storage.local.set({ "isSafe": safe });
    }
  });




  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.status === "loading" && safe === false && tab.url !== sufferUrl) {
      chrome.tabs.query({ url: sufferUrl }, function (sufferTabs) {
        if (sufferTabs && sufferTabs.length > 0) {
          chrome.tabs.update(sufferTabs[0].id, { active: true });
        } else {
          // If "suffer" tab is not open, create a new one
          chrome.tabs.create({ url: sufferUrl });
        }
      });
    }


  });



  chrome.tabs.onActivated.addListener(function(activeInfo) {
    // console.log("switched");
    if (safe==false){


      let repeat;
      repeat = setInterval(function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          if (tabs[0].url !== sufferUrl && !safe) {
              setTimeout(() => {
                if (safe || tabs[0].url === sufferUrl) clearInterval(repeat)
                chrome.tabs.query({ url: sufferUrl }, function (sufferTabs) {
                  if (sufferTabs && sufferTabs.length > 0) {
                    chrome.tabs.update(sufferTabs[0].id, { active: true });
                  } else {
                    // If "suffer" tab is not open, create a new one
                    chrome.tabs.create({ url: sufferUrl });
                  }
                });
              }, 100)
          }
        });
      }, 100);



    }
  });




});