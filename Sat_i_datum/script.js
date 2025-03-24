function countdown() {
  let dateNow = new Date();
  let days = dateNow.getDay()
  let date = dateNow.getDate();
  let months = dateNow.getMonth();
  let years = dateNow.getFullYear();
  let hours = dateNow.getHours();
  let minutes = dateNow.getMinutes();
  let seconds = dateNow.getSeconds();

  let outputVreme = document.getElementById("ispisVremena");
  let outputDays = document.getElementById("ispisDana");
  let outputDate = document.getElementById("ispisDatuma");

  const arrOfMonths = ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"];

  switch(days) {
    case 0:
      outputDays.innerHTML = "nedelja";
      break;
    case 1:
      outputDays.innerHTML = "ponedeljak";
      break;
    case 2:
      outputDays.innerHTML = "utorak";
      break;
    case 3:
      outputDays.innerHTML = "sreda";
      break;
    case 4:
      outputDays.innerHTML = "cetvrtak";
      break;
    case 5: 
      outputDays.innerHTML = "petak";
      break;
    default:
      outputDays.innerHTML = "subota";
  } 
     
  if (hours < 10) {
    if (minutes < 10) {
      outputVreme.innerHTML = "0" + hours + " : 0" + minutes;
    } else {
      outputVreme.innerHTML = "0" + hours + " : " + minutes;
    } 
  } else {
    if (minutes < 10) {
      outputVreme.innerHTML = hours + " : 0" + minutes;
    } else {
      outputVreme.innerHTML = hours + " : " + minutes;
    } 
  }
    
  outputDate.innerHTML = date + ". " + arrOfMonths[months] + " " + years;

  setTimeout(countdown, 1000);
}