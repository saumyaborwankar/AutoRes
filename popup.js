// import * as pdfjsLib from './pdf.js';
pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('pdf.worker.min.js');
document.addEventListener('DOMContentLoaded', function() {
  var pdftext = "";

  var submitBtn = document.getElementById('submit-btn');
  const pdfFileInput = document.getElementById("pdf-file");

  // update the pdftext varaible with change in input 
  pdfFileInput.addEventListener('change', () => {
    const file = pdfFileInput.files[0];
    pdfjsLib.getDocument(URL.createObjectURL(file)).promise.then(pdf => {
      // Loop through each page of the PDF file
      pdftext="";
      for (let i = 1; i <= pdf.numPages; i++) {
        // Get the text content of the page
        pdf.getPage(i).then(page => {
          page.getTextContent().then(textContent => {
            const text = textContent.items.map(item => item.str).join(" ");
            // Display the text content of the page
            pdftext+=text;
          });
        });
      }
    });
    console.log('pdf input change', pdftext.slice(0, 10));
  });



  // send data to content.js when submit button pressed

  submitBtn.addEventListener('click', function() {
    console.log('submit button pressed', pdftext.slice(0, 10));
      chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
        chrome.tabs.sendMessage(
          tab.id, 
          {
            type: 'pdfData', 
            data: pdftext
          },
          function(response){ 
            
            //receive response from content.js
            console.log(response);
            addSuggestions(response);
          })
      });
  });
});
function addSuggestions(response){
  //create divs for suggestions

  console.log('function',response);
}


// Dummy content_security_policy for manifest.json
// "content_security_policy": {
//   "extension_pages": "script-src 'self'; object-src 'self'",
//   "script-src": ["'self'", "https://cdnjs.cloudflare.com"],
//   "web_accessible_resources": "script-src 'self' https://cdnjs.cloudflare.com"
// },