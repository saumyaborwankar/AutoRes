(() => {
  //display webpage url
  console.log(window.location.href);
  // get data from webpage
  var webpageText = "";
  const apiKey = ''; // replace with your actual API key
   // replace with your actual prompt

  
  
  //wait for data to be sent from popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    webpageText = document.body.innerText;
    const paragraphs = document.getElementsByTagName("p");

    // Initialize an empty string to store the combined text
    let combinedText = "";

    // Loop through each <p> element and concatenate its text to the combinedText string
    for (let i = 0; i < paragraphs.length; i++) {
      combinedText += paragraphs[i].textContent;
    }

    // webpageText = document.body.getElementsByTagName("p").innerText.join(" ");
    if (request.type === 'pdfData') { // receive message
      // console.log("received pdf content from popup.js",request.data, webpageText);
      const suggestionFromOpenAI = "received pdf content from popup.js";
      // const prompt = `List the top 10 requirements that should be present in a candidate resume based on the following job description. "${webpageText}" \n  AI:`;
      const prompt = `Based on the following job description and my resume suggest changes in my resume to match the top 10 requirements only in the form of HTML tags <li></li> of the job description; Here is the Job Description: "${webpageText}"; and here is my resume: ${request.data} \n AI: `
      // const prompt = `Based on the following job description and my resume suggest changes in my resume to match the top 10 requirements of the job description; Here is the Job Description: ; and here is my resume: ${request.data} \n AI: `
      
      console.log(prompt);
      // console.log(webpageText);

      // create API req to OpenAI for narrowing the webpage text to description for job
      

      fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        // body: '{\n  "model": "text-ada-001",\n  "prompt": "what can you do?",\n  "temperature": 0.7,\n  "max_tokens": 256,\n  "top_p": 1,\n  "frequency_penalty": 0,\n  "presence_penalty": 0\n}',
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
        console.log(data);
        chrome.runtime.sendMessage( 
          {
            type: 'openAIResponse', 
            suggestion: data
          });
      })
      .catch(error => console.error(error));

      //create APi req to OpenAI for data from popup.js (pdfRawData) and content.js (webpageText)
      
  
  
      
      
  
  
      //send response from OPenAI back to popup.js for making divs on extension
      // sendResponse(suggestionFromOpenAI);
    }
  });
  })();


{/* <li>Demonstrated experience of working within AI/ML domains</li>
<li>Demonstrated use of algorithms and AI paradigms such as Deep Learning, Machine Learning, etc</li>

Programming: 
<li>Well versed in developing RESTful API services</li> 
<li>Experience of developing applications/ software using programming languages like Java, C++, Python, C#, Go, etc</li> 
<li>Familiar with Linux OS development environment</li> 
<li>Project experience with any one area of Graphics/Media/Display/ML/AI</li>

Web Technologies: 
<li>Agile development approaches with experience on tools and frameworks such as HTML, CSS, JavaScript, React.js, AJAX, Bootstrap, Selenium, etc</li> 
<li>Proficiency with database systems like PostgreSQL and Mongo DB</li> */}