let miles = document.getElementById("miles");
let result = document.getElementById("kmResult");
function convertMiToKm() {
  let distanceMiles = miles.value;
  let distanceKm = distanceMiles * 1.60934;  // 1 mile equals 1.60934 kilometers
  result.value = distanceKm;
  if(distanceMiles === "") {
    result.innerHTML = "";
    alert("Please, enter a value.");
  } else if(distanceMiles < 0) {
    alert("Distance is a measurement between objects, so it cannot be negative.");
    miles.value = "";
    result.innerHTML = "";
  } else {
    result.innerHTML = distanceMiles + " miles = " + distanceKm + " kilometers";
    miles.value = "";
  }
}