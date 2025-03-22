// The formula for calculating Body Mass Index (BMI) is: bmi = weight(kg) / (height(m) * height(m))
function calculateBMI() {
  let weightPounds = document.getElementById("weight").value;
  let heightInches = document.getElementById("height").value;
  let heightCentimeters = heightInches * 2.54;  // 1 inch = 2.54 centimetres
  let heightMeters = heightCentimeters / 100;   // convert centimeters to meters
  let weightKilograms = weightPounds / 2.2046;  // 2.2046 pounds in kilo

  let bmi = weightKilograms / heightMeters ** 2;
  document.getElementById("bmiResult").innerText = "Your BMI: " + bmi.toFixed(2);
  document.getElementById("bmiResult").style.display = "block";

  let category = "";
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = "Normal weight";
    } else if (bmi > 25 && bmi < 29.9) {
      category = "Overweight";
    } else {
      category = "Obesity";
    }

    document.getElementById("categoryResult").innerText = "Category: " + category;
    document.getElementById("categoryResult").style.display = "block";

  if (!weightPounds || !heightInches || heightInches <= 0 || weightPounds <= 0) {
    document.getElementById("bmiResult").innerText = "Please enter valid weight and height.";
    document.getElementById("categoryResult").innerText = "";
    document.getElementById("bmiResult").style.display = "block";
    document.getElementById("categoryResult").style.display = "block";
    return;
  }
}

function resetConverter() {
  let weightPounds = document.getElementById("weight");
  let heightInches = document.getElementById("height");
  weightPounds.value = "";
  heightInches.value = "";
  document.getElementById("bmiResult").style.display = "none";
  document.getElementById("categoryResult").style.display = "none";
}
