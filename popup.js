document.addEventListener('DOMContentLoaded', function() {
  var submitBtn = document.getElementById('submit-btn');
  // load data from pdf


  // send data to content.js
  submitBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
      chrome.tabs.sendMessage(
        tab.id, 
        {
          data:"pdfData",
          pdfRawData:"actual data"
        },
        function(response){ //receive response from content.js
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
