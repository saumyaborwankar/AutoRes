(() => {
  // get data from webpage
  var webpageText = "";
  const apiKey = ''; // replace with your actual API key

  
  //wait for data to be sent from popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    webpageText = document.body.innerText;
    if (request.type === 'pdfData') { // receive message
      const suggestionFromOpenAI = "received pdf content from popup.js";
      const prompt = `Based on the following job description and my resume suggest changes in my resume to match the top 10 requirements only in the form of HTML tags <li></li> of the job description; Here is the Job Description: "${webpageText}"; and here is my resume: ${request.data} \n AI: `;

      // create API req to OpenAI for narrowing the webpage text to description for job
      

      fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          'model': 'text-davinci-003',
          'prompt': `${prompt}`,
          'max_tokens': 250,
          'stop': [
            ' Human:',
            ' AI:'
          ]
        })
      })
      .then(response => response.json())
      .then(function(data){
        // send response back to popup.js to make new div tags for suggestions
        chrome.runtime.sendMessage( 
          {
            type: 'openAIResponse', 
            suggestion: data
          });
      })
      .catch(error => {
        console.log(error);
      });
    }
  });
  })();