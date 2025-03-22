function shakeBall() {
  // 15 random numbers; 12 random answers + default answer 
  let randomNumber = Math.floor(Math.random() * 15);
  let question = document.getElementById("question").value.trim();
  let randomAnswer = document.getElementById("answer");

  switch (randomNumber) {
    case 0:
      answer = "It will work out";
      break;
    case 1:
      answer = "Maybe, maybe not";
      break;
    case 2:
      answer = "Probably not";
      break;
    case 3:
      answer = "Highly likely";
      break;
    case 4:
      answer = "Yes";
      break;
    case 5:
      answer = "No";
      break;
    case 6:
      answer = "Ask again later";
      break;
    case 7: 
      answer = "Cannot predict now";
      break;
    case 8: 
      answer = "Don't count on it";
      break;
    case 9: 
      answer = "Without a doubt";
      break;
    case 10: 
      answer = "Better not tell you now";
      break;
    case 11: 
      answer = "Very doubtful";
      break;
    default:
      answer = "I don't know about that";
  }

  if (question === "") {
    alert("It looks like you didn't ask a question. If you're ready, just type one, and I'll give you a response like a Magic 8 Ball!");
    randomAnswer.innerHTML = "Please, ask a question!";
  } else {
    randomAnswer.innerHTML = "Thinking...";
    setTimeout(() => { 
      randomAnswer.innerHTML = answer;
    }, 1500);
  } 
}