let safe = false

function initializeVariables(callback) {
  chrome.storage.local.get(["lastDate", "isSafe"], function (result) {
    const full_today = new Date();
    const today = full_today.toLocaleDateString();
    console.log(today);
    console.log(result.lastDate);

    if (result.lastDate !== today) {
      // Update the date in storage
      chrome.storage.local.set({ "lastDate": today });
      chrome.storage.local.set({ "isSafe": false });
      safe = false;
    } else {
      safe = result.isSafe;
    }
    console.log("Safe initialized to:", safe);
    callback();
  });
}

initializeVariables(function() {


  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "changeSafe") {
      safe = message.value;
      console.log("Safe updated to:", safe);
      chrome.storage.local.set({ "isSafe": safe });
    }
  });




  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // console.log(changeInfo);
    // console.log(tab.url);
    // console.log(safe);
    if (changeInfo.status === "loading" && safe === false && tab.url !== "chrome-extension://dncfabafoamgjghbapdkdmlehbaclldk/tabs/suffer.html") {
      chrome.tabs.query({ url: "chrome-extension://dncfabafoamgjghbapdkdmlehbaclldk/tabs/suffer.html" }, function (sufferTabs) {
        if (sufferTabs.length > 0) {
          chrome.tabs.update(sufferTabs[0].id, { active: true });
        } else {
          // If "suffer" tab is not open, create a new one
          chrome.tabs.create({ url: "chrome-extension://dncfabafoamgjghbapdkdmlehbaclldk/tabs/suffer.html" });
        }
      });
    }
  });




  function changeScreen(tab){
    chrome.tabs.get(tab.tabId, function(tab) {
      if (tab.url !== "chrome-extension://dncfabafoamgjghbapdkdmlehbaclldk/tabs/suffer.html") {
          chrome.tabs.query({ url: "chrome-extension://dncfabafoamgjghbapdkdmlehbaclldk/tabs/suffer.html" }, function (sufferTabs) {
            if (sufferTabs.length > 0) {
              chrome.tabs.update(sufferTabs[0].id, { active: true });
            } else {
              // If "suffer" tab is not open, create a new one
              chrome.tabs.create({ url: "chrome-extension://dncfabafoamgjghbapdkdmlehbaclldk/tabs/suffer.html" });
            }
          });
      }
    });
  }




  chrome.tabs.onActivated.addListener(function(activeInfo) {
    // console.log("switched");
    if (safe==false){


      let repeat;
      repeat = setInterval(function(){
        chrome.tabs.get(activeInfo.tabId, function(tab) {
          if (tab.url !== "chrome-extension://dncfabafoamgjghbapdkdmlehbaclldk/tabs/suffer.html" && !safe) {
              setTimeout(() => {
                console.log('entered intervals')
                if (safe || tab.url === "chrome-extension://dncfabafoamgjghbapdkdmlehbaclldk/tabs/suffer.html") clearInterval(repeat)
                chrome.tabs.query({ url: "chrome-extension://dncfabafoamgjghbapdkdmlehbaclldk/tabs/suffer.html" }, function (sufferTabs) {
                  if (sufferTabs.length > 0) {
                    chrome.tabs.update(sufferTabs[0].id, { active: true });
                  } else {
                    // If "suffer" tab is not open, create a new one
                    chrome.tabs.create({ url: "chrome-extension://dncfabafoamgjghbapdkdmlehbaclldk/tabs/suffer.html" });
                  }
                });
              }, 100)
          }
        });
      }, 100);



    }
  });




});