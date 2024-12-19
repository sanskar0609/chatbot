// Options the user could type in
const prompts = [
  ["how to apply to a job", "how do I apply", "apply to a job"],
  ["how to search for jobs", "job search", "search jobs"],
  ["how to create a profile", "create profile", "set up profile"],
  ["how to contact a freelancer", "message freelancer", "contact freelancer"],
  ["how to hire a freelancer", "hire freelancer", "freelancer hire"],
  ["how to withdraw money", "withdraw money", "money withdrawal"],
  ['hii'],
  
]



const replies = [
  ["Go to search and click on the 'Apply' button."],
  ["Use the search bar to find jobs based on your skills and preferences."],
  ["Go to your account settings and click on 'Create Profile'."],
  ["Go to the freelancer's profile and click on the 'Message' button."],
  ["Go to the freelancer's profile and click 'Hire'. Make sure you've reviewed their profile and portfolio."],
  ["Go to your wallet, and click 'Withdraw'. Follow the instructions for withdrawal."],
  ['How can i help you'],
]


const alternative = [
  "I didn't catch that, try asking again.",
  "Can you rephrase?",
  "I'm not sure about that."
]


function getResponse(userInput) {
  let response;
  for (let i = 0; i < prompts.length; i++) {
    if (prompts[i].includes(userInput.toLowerCase())) {
      let possibleReplies = replies[i];
      response = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
      break;
    }
  }
  return response || alternative[Math.floor(Math.random() * alternative.length)];
}
