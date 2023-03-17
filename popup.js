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
    console.log('pdf input change', pdftext);
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'openAIResponse') {
      // console.log('response from openai generated',request.suggestion);
      addSuggestions(request.suggestion);
    }
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
            // addSuggestions(response);
          })
      });
  });
});

function addSuggestions(response){
  //create divs for suggestions

  // console.log('received response from OpenAI',response.choices[0].text);
  const htmlString = response.choices[0].text;
  // Create a new DOMParser object
  const parser = new DOMParser();

  // Use the parseFromString method to parse the HTML string as a document
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Use the querySelectorAll method to select all <li> tags in the document
  const liElements = doc.querySelectorAll('li');

  // Create an empty array to store the list items
  const listItems = [];

  // Loop through the <li> elements and push each one to the array
  for (let i = 0; i < liElements.length; i++) {
    listItems.push(liElements[i].textContent);
  }

  // Log the array of list items
  console.log(listItems);
  // Get the body element of the popup window
  const popupBody = document.getElementById('popup-body');

  // Loop through the list items and create a new <div> tag for each one
  for (let i = 0; i < listItems.length; i++) {
    // Create a new <div> tag
    const newItemDiv = document.createElement('div');
    
    // Set the text content of the <div> tag to the current list item
    newItemDiv.textContent = listItems[i];
    
    // Append the new <div> tag to the popup body
    popupBody.appendChild(newItemDiv);
  }
}


// Dummy content_security_policy for manifest.json
// "content_security_policy": {
//   "extension_pages": "script-src 'self'; object-src 'self'",
//   "script-src": ["'self'", "https://cdnjs.cloudflare.com"],
//   "web_accessible_resources": "script-src 'self' https://cdnjs.cloudflare.com"
// },