// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//     if (tab.url) {
//       const queryParameters = tab.url;
//       const urlParameters = new URLSearchParams(queryParameters);
//       console.log(queryParameters,urlParameters);
//       chrome.tabs.sendMessage(tabId, {
//         type: "NEW",
//         videoId: urlParameters,
//       });
//     }
//   });
  