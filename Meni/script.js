class Menu {
  #nizCena;
  nizKol; // Quantities for all products

  constructor(nizCena, nizKol) {
    this.#nizCena = nizCena; // Price array
    this.nizKol = nizKol; // Quantity array
  }

  // General method for calculating the price of a product depending on its quantity and price
  kalkulatorCena(kol, cena) {
    return kol * cena;
  }

  // Getters for all products that call the kalkulatorCena method for the corresponding quantity and price from the arrays
  get cenaProizvoda() {
    return this.nizKol.map((kol, index) => this.kalkulatorCena(kol, this.#nizCena[index]));
  }

  // Method for calculating the total price
  ukupnaCena() {
    return this.cenaProizvoda.reduce((total, cena) => total + cena, 0);
  }

  // Getter that calls ukupnaCena and returns the total price
  get ukupnoZaPlacanje() {
    return this.ukupnaCena();
  }
}

function calculateTotal() {
  let cene = [210, 220, 150, 190, 260, 160, 190, 180, 210, 200, 220, 250, 160, 200, 300]; 
       
  let kolicine = []; // Create an empty array that will contain the values from the input fields (product quantities)
  for (let i = 1; i <= 15; i++) {
    kolicine.push(parseFloat(document.getElementById(`kol${i}`).value));
  };

  let porudzbina = new Menu(cene, kolicine);
      
  document.getElementById("total").textContent = porudzbina.ukupnoZaPlacanje + " din";
     
  const ukupnaCena = document.querySelectorAll(".ukupnaCena"); // Array of all (td) elements with the "ukupnaCena" class
  for(let i = 1; i < ukupnaCena.length; i++) {
    ukupnaCena[i].textContent = porudzbina.cenaProizvoda[i - 1];
  }

  let popust = 0;
  let cenaSaPopustom = 0;
  let usteda = document.getElementById("usteda");
  let novaCena = document.getElementById("novaCena");
  if (porudzbina.ukupnoZaPlacanje > 500) {   // If the total price to pay is greater than 500 din, a 10% discount is applied
    popust = porudzbina.ukupnoZaPlacanje * 0.1; 
    cenaSaPopustom = porudzbina.ukupnoZaPlacanje - popust;
  }

  if (popust > 0) { // If a discount is applied, display the discount and the new reduced price 
    usteda.innerHTML = "-" + popust + " din";
    novaCena.textContent = cenaSaPopustom + " din";
  } else {
    usteda.innerHTML = "0 din";
    novaCena.textContent = porudzbina.ukupnoZaPlacanje + " din";
  }
}

document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener("input", calculateTotal); // For each input field (representing the product quantity), when a quantity is entered, the calculateTotal function is applied
  input.addEventListener("keydown", function(event) {
    event.preventDefault();  // Disables entering quantity via keyboard
  });
}); 

calculateTotal();