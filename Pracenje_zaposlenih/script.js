const form = document.getElementById("zaposleniForm");
const tabela = document.getElementById("zaposleniLista");
const btnDodaj = document.getElementById("dodavanje");
btnDodaj.onclick = function() {        
  let container = document.querySelector(".container");
  // Toggle display
  if (container.style.display === "block") {
    container.style.display = "none";
  } else {
    container.style.display = "block";
  }
}

class Zaposleni {
  constructor(id, ime, prezime, datumRodjenja, JMBG, adresa, telefon, email, pozicija, datumZaposlenja, plata, odeljenje, status = "aktivan") {
    this.id = id;
    this.ime = ime;
    this.prezime = prezime;
    this.datumRodjenja = datumRodjenja;
    this.JMBG = JMBG;
    this.adresa = adresa;
    this.telefon = telefon;
    this.email = email;
    this.pozicija = pozicija;
    this.datumZaposlenja = datumZaposlenja;
    this.plata = plata;
    this.odeljenje = odeljenje;
    this.status = status;
  }

  prikazUTabeli() {
    const tr = document.createElement("tr");

    const podaci = [this.id, this.ime, this.prezime, this.datumRodjenja, this.JMBG, this.adresa, this.telefon, this.email, 
                    this.pozicija, this.datumZaposlenja, this.plata, this.odeljenje, this.status];

    podaci.forEach((podatak) => {
      const td = kreirajElement("td", tr, podatak, "stilTd");
    });

    // Create remove button
    const removeTd = document.createElement("td");
    const removeBtn = kreirajElement("button", removeTd, "Ukloni", "stilDugmeRemove");
    tr.appendChild(removeTd);

    // Add event listener to remove button
    removeBtn.addEventListener("click", () => {
      firma.ukloniZaposlenog(this.id); // Remove employee from the list
    });
    
    const tdHidden = kreirajElement("td", tr, podaci.join(" "), "tdHidden"); 
    //console.log(tdHidden);

    tabela.appendChild(tr);
  }
}

class Firma {
  constructor(naziv) {
    this.naziv = naziv;
        
    // Parse and create Zaposleni objects from localStorage data 
    this.listaZaposlenih = (JSON.parse(localStorage.getItem("listaZaposlenih")) || []).map(data => { 
      return new Zaposleni(
        data.id,
        data.ime,
        data.prezime,
        data.datumRodjenja,
        data.JMBG,
        data.adresa,
        data.telefon,
        data.email,
        data.pozicija,
        data.datumZaposlenja,
        data.plata,
        data.odeljenje,
        data.status
      );
    }); // This code ensures that each employee object loaded from localStorage is properly converted back to a Zaposleni instance, with the prikazUTabeli method available for each employee.

    this.prikaziSveZaposlene(); // Show employees after loading
  }

  // Method for adding an employee to the company (we add them to the listaZaposlenih list)
  dodajZaposlenog(zaposleni) {
    this.listaZaposlenih.push(zaposleni);
    this.sacuvajZaposlene(); // Save changes to localStorage
    this.prikaziSveZaposlene(); // Update the display
  }

  // Method for removing an employee
  ukloniZaposlenog(id) {
    // Find the employee index by ID
    const index = this.listaZaposlenih.findIndex(zaposleni => zaposleni.id === id);
  
    if (index !== -1) {
      // Remove the employee from the array
      this.listaZaposlenih.splice(index, 1);
      this.sacuvajZaposlene(); // Save the updated list to localStorage
      this.prikaziSveZaposlene(); // Re-render the table
    }
  }

  // Save the updated list of employees to localStorage
  sacuvajZaposlene() {
    localStorage.setItem("listaZaposlenih", JSON.stringify(this.listaZaposlenih));
  }

  // Method to display all employees
  prikaziSveZaposlene() {
    tabela.innerHTML = "";
    this.listaZaposlenih.forEach(zaposlenog => {
      zaposlenog.prikazUTabeli();
    });
  }

  // Method for filtering employees by status
  filtrirajZaposlenePoStatusu(status) {
    tabela.innerHTML = "";
    const filtriraniZaposleni = this.listaZaposlenih.filter(zaposleni => zaposleni.status === status);
    filtriraniZaposleni.forEach(zaposleni => {
      zaposleni.prikazUTabeli();
    });
  }
}

const firma = new Firma("MojaFirma"); 

// Adding a new employee via the form
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const id = document.getElementById("ID").value;
  const ime = document.getElementById("ime").value;
  const prezime = document.getElementById("prezime").value;
  const datumRodjenja = document.getElementById("datumRodjenja").value;
  const JMBG = document.getElementById("JMBG").value;
  const adresa = document.getElementById("adresa").value;
  const telefon = document.getElementById("brojTelefona").value;
  const email = document.getElementById("email").value;
  const pozicija = document.getElementById("pozicija").value;
  const datumZaposlenja = document.getElementById("datumZaposlenja").value;
  const plata = Math.max(0, parseInt(document.getElementById("plata").value) || 0);
  const odeljenje = document.getElementById("odeljenje").value;
  const status = document.getElementById("status").value;

  // Check if the ID already exists
  const existingEmployee = firma.listaZaposlenih.find(zaposleni => zaposleni.id === id);
  if (existingEmployee) {
    alert("Error: This ID already exists. Please choose a different ID.");
    return;  // Exit the function if the ID is duplicate
  }

  const noviZaposleni = new Zaposleni(id, ime, prezime, datumRodjenja, JMBG, adresa, telefon, email, pozicija, datumZaposlenja, plata, odeljenje, status);
  firma.dodajZaposlenog(noviZaposleni);

  form.reset();
  firma.prikaziSveZaposlene();
  document.querySelector(".container").style.display = "none"; // When an employee is added via the form, the form is hidden
});

// Filter function
function filtrirajZaposlene(status) {
  firma.filtrirajZaposlenePoStatusu(status);
}

function prikaziSveZaposlene() {
  firma.prikaziSveZaposlene();
}

// Function to create a new element
function kreirajElement(tipElementa, nadredjeniElement, output, klasa) {
  let temp = document.createElement(tipElementa);
  temp.textContent = output;
  temp.classList.add(klasa)
  nadredjeniElement.append(temp);
  return temp;
}

document.addEventListener("DOMContentLoaded", function() {
  firma.prikaziSveZaposlene(); // Load employees on page load
});

const searchInput = document.getElementById("searchInput"); 
const vrste = tabela.getElementsByTagName("tr");

// Search functionality
searchInput.addEventListener("keyup", function() {
  const query = searchInput.value.toLowerCase().split(" "); // Convert the input value to lowercase and split it into an array of words

  for (let i = 0; i < vrste.length; i++) {
    const celije = vrste[i].getElementsByTagName("td");
    let match = false;

    // Check both visible and hidden <td> elements
    for (let j = 0; j < celije.length; j++) {
      query.every( function(value) { 
        // Check if the cell's text includes each value in the query array (case-insensitive)             
        if (celije[j].textContent.toLowerCase().includes(value)) {
          match = true;
        } else {
          match = false;
        }
        return match;
      });
    };
      
    vrste[i].style.display = match ? "" : "none"; // Display row if it matches
  }
});

// Double-click to edit functionality
tabela.addEventListener("dblclick", function(event) {
  const target = event.target;

  // Only allow editing on td elements (table cells) but skip the ID column (index 0)
  if (target.tagName === "TD") {
    if (target.cellIndex === 0) {
      // Alert that ID cannot be changed
      alert("ID cannot be changed.");
      return;
    }

    const originalText = target.textContent;

    //Make the cell editable by adding the contenteditable attribute
    target.setAttribute("contenteditable", "true");
    target.focus();
      
    // When the user press "Enter" or clicks outside, update the text
    target.addEventListener("blur", updateCell);
    target.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      updateCell();
    }
  });

  // Function to update the cell content
  function updateCell() {
    const newText = target.textContent.trim();
    if (newText !== "") {
      const columnIndex = target.cellIndex;
      const row = target.closest("tr");
      const idCell = row.querySelector("td:first-child").textContent; // Assuming ID is the first column
      const employee = firma.listaZaposlenih.find(zaposleni => zaposleni.id === idCell);

      // Prevent editing the ID
      if (employee) {
        // Update the corresponding field on the column index
        switch (columnIndex) {  
          case 1: 
            employee.ime = newText; // Name
            break; 
          case 2: 
            employee.prezime = newText; // Surname
            break; 
          case 3: 
            employee.datumRodjenja = newText; // Date of birth
            break; 
          case 4: 
            employee.JMBG = newText; 
            break;
          case 5: 
            employee.adresa = newText;
            break;
          case 6: 
            employee.telefon = newText;
            break;
          case 7:
            employee.email = newText; 
            break;
          case 8: 
            employee.pozicija = newText; 
            break;
          case 9: 
            employee.datumZaposlenja = newText; 
            break;
          case 10: 
            employee.plata = newText;
            break;
          case 11:
            employee.odeljenje = newText;
            break;
          case 12: 
            employee.status = newText; 
            break;
          }

          // After updating, save the updated employee list to localStorage
          firma.sacuvajZaposlene(); // Save updated data to localStorage
        }
      } else {
        target.textContent = originalText; // Revert to original text if empty
      }

      // Remove the contenteditable attribute after editing
      target.removeAttribute("contenteditable");
    }
  }
}); 