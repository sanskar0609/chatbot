document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value.trim(); // Ensure no leading/trailing whitespace
      if (input) { // Proceed only if input is not empty
        inputField.value = "";
        output(input);
      }
    }
  });
});

function output(input) {
  let product;

  // Normalize the input
  let text = input.toLowerCase()
    .replace(/[^\w\s]/gi, "") // Remove special characters
    .replace(/[\d]/gi, "")    // Remove digits
    .trim();                  // Remove leading and trailing spaces
  text = text
    .replace(/ a /g, " ")     // Replace specific phrases
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(prompts, replies, text)) { 
    // Search for an exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!";
  } else if (text.match(/coronavirus|covid/gi)) {
    // If no match, check if the message contains `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    // If all else fails: return a random alternative response
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update the chat UI
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        return replies[Math.floor(Math.random() * replies.length)];
      }
    }
  }
  return null; // No match found
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  // User message
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  // Bot "Typing..." message
  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botImg);
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  // Scroll to the latest message
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Simulated typing delay
  setTimeout(() => {
    botText.innerText = product; // Replace "Typing..." with the bot's response
    textToSpeech(product); // Convert response to speech if applicable
  }, 2000);
}
