function countdown() {
  let dateNow = new Date();
  let endDate = document.getElementById("datum").value;
  let total = Date.parse(endDate) - Date.parse(dateNow);
  let days = Math.floor(total / (1000 * 60 * 60 * 24));
  let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((total / (1000 * 60)) % 60);
  let seconds = Math.floor((total / 1000) % 60);

  return {days, hours, minutes, seconds};
}

function update() {
  let temp = countdown();
  let endDate = document.getElementById("datum").value;
  let dateNow = new Date();
  let total =  Date.parse(endDate) - Date.parse(dateNow);
  let output1 = document.getElementById("ispis1");
  let output2 = document.getElementById("ispis2");
  let output3 = document.getElementById("ispis3");
  let output4 = document.getElementById("ispis4");
  let output5 = document.getElementById("ispis5");
  let text1 = document.getElementById("text1");
  let text2 = document.getElementById("text2");
      
  tempOutput1 = "";
  tempOutput2 = "";
  tempOutput3 = "";
  tempOutput4 = "";
  tempOutput5 = "";
      
  if (total <= 0) {
    tempOutput1 +=  (temp["days"] + 2 * -temp["days"] - 1) + "<br> <span id='ispisMali'> days </span>";
    tempOutput2 +=  (temp["hours"] + 2 * -temp["hours"]) + "</span>" + "<br> <span id='ispisMali'> hours </span>";
    tempOutput3 +=  (temp["minutes"] + 2 * -temp["minutes"] - 1) + "</span>" + "<br> <span id='ispisMali'> minutes </span>";
    tempOutput4 +=  (temp["seconds"] + 2 * -temp["seconds"]) + "</span>" + "<br> <span id='ispisMali'> seconds </span>";
    output1.innerHTML = tempOutput1; 
    output2.innerHTML = tempOutput2;
    output3.innerHTML = tempOutput3;
    output4.innerHTML = tempOutput4;
    output1.style.display = "block";
    output2.style.display = "block";
    output3.style.display = "block";
    output4.style.display = "block";
    output5.style.display = "none";
    text1.innerHTML = "Time since " + endDate;
    text1.style.display = "inline-block";
    text2.style.display = "none";
  } else {
    for (let elem in temp) {
      output1.style.display = "none";
      output2.style.display = "none";
      output3.style.display = "none";
      output4.style.display = "none";
      text1.style.display = "none";
      tempOutput5 += "<div class='ispis'>" + temp[elem] + "<br> <span id='ispisMali'>" + elem + "</span>" + "</div>";
      output5.innerHTML = tempOutput5;
      output5.style.display = "block";
      text2.innerHTML = "Time until " + endDate;
      text2.style.display = "inline-block";  
    }
  };
    
  setTimeout(update, 1000);
}