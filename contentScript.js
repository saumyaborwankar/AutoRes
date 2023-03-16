(() => {
  //display webpage url
  console.log(window.location.href);
  // get data from webpage
  var webpageText = document.body.innerText;
  // console.log(webpageText);
  
  
  
  //wait for data to be sent from popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'pdfData') { // receive message
      console.log("received pdf content from popup.js",request.data, webpageText);
      const suggestionFromOpenAI = "received pdf content from popup.js";


      // create API req to OpenAI for narrowing the webpage text to description for job
      

      //create APi req to OpenAI for data from popup.js (pdfRawData) and content.js (webpageText)
      
  
  
      
      
  
  
      //send response from OPenAI back to popup.js for making divs on extension
      sendResponse(suggestionFromOpenAI);
    }
  });
  })();