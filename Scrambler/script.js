const btn = document.querySelector("button");
btn.addEventListener("click", skrembler);

function skrembler() {
  const unos = document.getElementById("unos").value;
  const ispis = document.getElementById("skremblovanaRec");
  const upozorenje = document.getElementById("upozorenje");

  if (unos.trim() === "") { // Check if the input field is empty - if it's empty, an appropriate message will be displayed
    ispis.innerHTML = "Unesite reč za skremblovanje!";
    ispis.style.color = "red";
  } else { // If the input field is not empty, a scrambled word will be displayed
    let skremblovanaRec = skremblerReci(unos);
    ispis.innerHTML = "Skremblovana reč: " + "<span id='skrRecBlack'>" + skremblovanaRec + "</span>";
    ispis.style.color = "rgb(25, 100, 165)";
    let skrRecBlack = document.getElementById("skrRecBlack"); 
    skrRecBlack.style.color = "black";ch
  } 
}

function skremblerReci(val) {
  let max = val.length;
  let temp = "";
  for(let i = 0; i < max; i++) {
    let index = Math.floor(Math.random() * val.length);
    temp += val[index];
    val = val.substring(0, index) + val.substring(index + 1);
  }
  return temp;
}