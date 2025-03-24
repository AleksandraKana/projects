function countdown() {
  let dateNow = new Date();
  let days = dateNow.getDay()
  let date = dateNow.getDate();
  let months = dateNow.getMonth();
  let years = dateNow.getFullYear();
  let hours = dateNow.getHours();
  let minutes = dateNow.getMinutes();
  let seconds = dateNow.getSeconds();

  let outputDays = document.getElementById("outputDays");
  let outputTime = document.getElementById("outputTime");
  let outputDate = document.getElementById("outputDate");
  let outputYear = document.getElementById("outputYear");

  const arrOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  switch(days) {
    case 0:
      outputDays.innerHTML = "Sunday";
      break;
    case 1:
      outputDays.innerHTML = "Monday";
      break;
    case 2:
      outputDays.innerHTML = "Tuesday";
      break;
    case 3:
      outputDays.innerHTML = "Wednesday";
      break;
    case 4:
      outputDays.innerHTML = "Thursday";
      break;
    case 5: 
      outputDays.innerHTML = "Friday";
      break;
    default:
      outputDays.innerHTML = "Saturday";
  } 
      
  if (hours < 10) {
    if (minutes < 10) {
      if(seconds < 10) {
        outputTime.innerHTML = "0" + hours + " : 0" + minutes + " : 0" + seconds;
      } else {
        outputTime.innerHTML = "0" + hours + " : 0" + minutes + " : " + seconds;
      } 
    } else {
      if(seconds < 10) {
        outputTime.innerHTML = "0" + hours + " : " + minutes + " : 0" + seconds;
      } else {
        outputTime.innerHTML = "0" + hours + " : " + minutes + " : " + seconds;
      } 
    }
  } else {
    if (minutes < 10) {
      if(seconds < 10) {
        outputTime.innerHTML = hours + " : 0" + minutes + " : 0" + seconds;
      } else {
        outputTime.innerHTML = hours + " : 0" + minutes + " : " + seconds;
      } 
    } else {
      if(seconds < 10) {
        outputTime.innerHTML = hours + " : " + minutes + " : 0" + seconds;
      } else {
        outputTime.innerHTML = hours + " : " + minutes + " : " + seconds;
      } 
    }
  }
    
  outputDate.innerHTML = arrOfMonths[months] + ", " + date;
  outputYear.innerHTML = years;

  setTimeout(countdown, 1000);
}