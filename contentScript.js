(() => {
  console.log(window.location.href);
  var webpageText = document.body.innerText;
  // console.log(webpageText);
  
  
  
  //wait for data to be sent from popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'pdfData') { // receive message
      // const pdfRawData = msg.pdfRawData;
      // var pdfData = new Uint8Array(request.data);
      // var loadingTask = pdfjsLib.getDocument({data: pdfData});
      // loadingTask.promise.then(function(pdf) {
      //   var numPages = pdf.numPages;
      //   var pageTextPromises = [];
      //   for (var i = 1; i <= numPages; i++) {
      //     pageTextPromises.push(pdf.getPage(i).then(function(page) {
      //       return page.getTextContent().then(function(textContent) {
      //         return textContent.items.map(function(s) {
      //           return s.str;
      //         }).join(' ');
      //       });
      //     }));
      //   }
      //   Promise.all(pageTextPromises).then(function(pages) {
      //     var text = pages.join('\n');
      //     console.log(text);
      //   });
      // });
      //create APi req to OpenAI for data from popup.js (pdfRawData) and content.js (webpageText)
      
  
  
      
      console.log("received pdf content from popup.js",request.data.slice(0,10));
      const uniqTexts = "received pdf content from popup.js";
  
  
      //send response from OPenAI back to popup.js for making divs on extension
      sendResponse(uniqTexts);
    }
  });
  })();