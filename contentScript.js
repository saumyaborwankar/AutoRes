(() => {
  console.log(window.location.href);
  var webpageText = document.body.innerText;
  // console.log(webpageText);
  
  
  
  //wait for data to be sent from popup.js
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.data === 'pdfData') { // receive message
      const pdfRawData = msg.pdfRawData;
  
      //create APi req to OpenAPI for data from popup.js (pdfRawData) and content.js (webpageText)
  
  
  
      
      console.log("content",pdfRawData);
      const uniqTexts = "gott it";
  
  
      //send response from OPenAPI back to popup.js for making divs on extension
      sendResponse(uniqTexts);
    }
  });
  })();