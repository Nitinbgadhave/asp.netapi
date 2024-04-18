// Dropdown options
var materials = ["Mild Steel", "Stainless Steel", "Aluminum", "Titanium", "Galvanized", "Copper", "Brass"];
var results = ["OK", "Not OK"];

// Populate dropdowns
var materialOptions = materials.map(material => `<option value="${material}">${material}</option>`).join("");
var resultOptions = results.map(result => `<option value="${result}">${result}</option>`).join("");

document.querySelectorAll("select[name='material']").forEach(select => {
    select.innerHTML = materialOptions;
});

document.querySelectorAll("select[name^='result']").forEach(select => {
    select.innerHTML = resultOptions;
});

// Function to add a new row to the thickness table
function addRow() {
    var table = document.getElementById("thickness-table-body");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = `<select name="material-${rowCount + 1}">${materialOptions}</select>`;
    cell2.innerHTML = `<input type="text" name="thickness-${rowCount + 1}" placeholder="Enter Thickness">`;
    cell3.innerHTML = `<select name="result-${rowCount + 1}">${resultOptions}</select>`;
    cell4.innerHTML = `<input type="text" name="remark-${rowCount + 1}" placeholder="Enter Remark">`;
}

// Function to add a new row to the other table
function addOtherRow() {
    var table = document.getElementById("other-table");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = `<input type="text" name="description-${rowCount + 1}" placeholder="Enter Description">`;
    cell2.innerHTML = `<input type="text" name="remark-${rowCount + 1}" placeholder="Enter Remark">`;
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault();

    // Hide placeholders when the submit button is clicked
    hidePlaceholders();

    // Collect form data (you can use FormData or any method you prefer)
    let formData = new FormData(document.getElementById('report-form'));

    // Check for duplicate entries
    let materialsSet = new Set();
    let descriptionsSet = new Set();

    // Iterate over each row in the thickness table
    var table = document.getElementById("thickness-table-body");
    for (var i = 0, row; row = table.rows[i]; i++) {
        var materialSelect = row.cells[0].querySelector("select");
        var selectedMaterial = materialSelect.value;

        if (materialsSet.has(selectedMaterial)) {
            alert("Duplicate material selection found. Please remove the duplicate entry.");
            return;
        }
        materialsSet.add(selectedMaterial);
        formData.append("material" + i, selectedMaterial);
    }

    // Iterate over each row in the other table
    var otherTable = document.getElementById("other-table");
    for (var i = 0, row; row = otherTable.rows[i]; i++) {
        var descriptionInput = row.cells[0].querySelector("input");
        var descriptionValue = descriptionInput.value;

        if (descriptionsSet.has(descriptionValue)) {
            alert("Duplicate description found. Please remove the duplicate entry.");
            return;
        }
        descriptionsSet.add(descriptionValue);
    }

    // // Proceed with form submission if no duplicates are found
    // if (confirm("Are you sure you want to submit the form and download the PDF?")) {
    //     // Your form submission logic here
    //     alert("Form submitted successfully and PDF downloaded!");
    // }
}

// Function to hide placeholders
function hidePlaceholders() {
    var inputs = document.querySelectorAll("input[type=text]");
    inputs.forEach(input => {
        input.removeAttribute("placeholder");
    });
}

// Event listener to trigger form submission
document.getElementById('report-form').addEventListener('submit', submitForm);

// Event listener to trigger validation on date changes
document.getElementById('Start-date').addEventListener('change', calculateAndValidateDays);
document.getElementById('End-date').addEventListener('change', calculateAndValidateDays);
document.getElementById('no-of-days').addEventListener('change', calculateAndValidateDays);

// Function to calculate and validate days
function calculateAndValidateDays() {
    const startDate = new Date(document.getElementById('Start-date').value);
    const endDate = new Date(document.getElementById('End-date').value);

    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

    const enteredDays = parseInt(document.getElementById('no-of-days').value);

    if (enteredDays > totalDays) {
        alert(`Error: Entered number of days (${enteredDays}) cannot be greater than the actual number of days (${totalDays}) between the selected dates.`);
        document.getElementById('no-of-days').value = '';
    }
}

// Function to go to the dashboard
function goToDashboard() {
    if (confirm("Are you sure you want to go to the dashboard?")) {
        window.location.href = './select.html';
    }
}


let pdfGenerated = false;

function submitForm(event) {
    event.preventDefault();

    if (pdfGenerated) {
        return;
    }
    if (!confirm("Are you sure you want to submit the form and download the PDF?")) {
        document.getElementById('report-form').reset(); // Reset the form
        return;
      
    }
    pdfGenerated = true;

    // Hide all buttons
    document.getElementById("add-thickness-button").style.display = "none";
    document.getElementById("addOtherButton").style.display = "none";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("dashboard-btn").style.display = "none";

    // Hide placeholders when the submit button is clicked
    hidePlaceholders();

    // Collect form data (you can use FormData or any method you prefer)
    let formData = new FormData(document.getElementById('report-form'));

    // Check for duplicate entries
    let materialsSet = new Set();
    let descriptionsSet = new Set();
    let duplicateFound = false;

    // Iterate over each row in the thickness table
    var table = document.getElementById("thickness-table-body");
    for (var i = 0, row; row = table.rows[i]; i++) {
        var materialSelect = row.cells[0].querySelector("select");
        var selectedMaterial = materialSelect.value;

        if (materialsSet.has(selectedMaterial)) {
            // alert("Duplicate material selection found. Please remove the duplicate entry.");
            duplicateFound = false;
            break; // Exit the loop if a duplicate is found
        }
        materialsSet.add(selectedMaterial);
        formData.append("material" + i, selectedMaterial);
    }

    if (duplicateFound) {
        return; // Prevent form submission
    }

    // Iterate over each row in the other table
    var otherTable = document.getElementById("other-table");
    for (var i = 0, row; row = otherTable.rows[i]; i++) {
        var descriptionInput = row.cells[0].querySelector("input");
        var descriptionValue = descriptionInput.value;

        if (descriptionsSet.has(descriptionValue)) {
            // alert("Duplicate description found. Please remove the duplicate entry.");
            duplicateFound = false;
            break; // Exit the loop if a duplicate is found
        }
        descriptionsSet.add(descriptionValue);
    }

    if (duplicateFound) {
        return; // Prevent form submission
    }
    // Proceed with form submission
    // Send form data to Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbw7b-_js6MJRHqf15y5sAdLgMM7fHSl3s4xMEqMEBm9zoAW1pX-tMtsdNjcpE4DQ6K-GA/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(tokenNumber => {
        let words = tokenNumber.split(',');
        let firstWord = words[0];
        let tokenNumberText = `Token Number: ${firstWord}`;
        console.log('Token Number:', tokenNumberText);
        document.getElementById('token-number').innerText = tokenNumberText;

        // Generate the PDF with company name, address, heading, token number, actual form data, and table of the report details
        let companyName = 'Suresh Indu Lasers Private Limited';
        let companyAddress = 'Address: Sub Plot No.19 Out of Final Plot No. 117 & 118, Ramtekdi Industrial Area, Hadapsar, Pune – 411013. INDIA.';
        let heading = 'Machine Installation/Commissioning Report';

        // Create a div to hold the company name, address, heading, token number, actual form data, and table of the report details
        let headerDiv = document.createElement('div');
        headerDiv.appendChild(document.createElement('br'));

        // Create and style the company name element
        let companyNameElement = document.createElement('h1');
        companyNameElement.textContent = companyName;
        companyNameElement.style.fontWeight = 'bold';
        companyNameElement.style.color = 'red';
        companyNameElement.style.fontFamily = 'Times New Roman'; // Set font style to Times New Roman
        headerDiv.appendChild(companyNameElement);

        // Create and style the company address element
        let companyAddressElement = document.createElement('p');
        companyAddressElement.textContent = companyAddress;
        headerDiv.appendChild(companyAddressElement);

        // Create and style the heading element
        let headingElement = document.createElement('h1');
        headingElement.textContent = heading;
        headingElement.style.fontWeight = 'bold';
        headingElement.style.fontFamily = 'Times New Roman'; // Set font style to Times New Roman
        headerDiv.appendChild(headingElement);

        // Create and style the token number element
        let tokenNumberElement = document.createElement('p');
        tokenNumberElement.textContent = tokenNumberText;
        tokenNumberElement.style.fontWeight = 'bold';
        headerDiv.appendChild(tokenNumberElement);

        // Append the header div to the form
        document.getElementById('report-form').insertBefore(headerDiv, document.getElementById('report-form').firstChild);

        // Generate the PDF
        html2pdf(document.getElementById('report-form'), {
            margin: 1,
            filename: 'report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
            // Add page breaks before or after specific elements
            pagebreak: { mode: 'avoid-all', before: '.pagebreak-before', after: '.pagebreak-after' },
        }).then(pdf => {
            // Convert the PDF to a blob
            pdf.output('blob').then(blob => {
                // Create a blob URL for the PDF
                let url = URL.createObjectURL(blob);
                // Trigger the download
                let a = document.createElement('a');
                a.href = url;
                a.download = 'report.pdf';
                a.click();
            });
        });

        alert("Form submitted successfully and PDF downloaded!");
        

    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert("An error occurred while submitting the form. Please try again.");
    });
   
}
