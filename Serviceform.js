
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Submit the form
  this.submit();
       
// Reset the form after submission
this.reset();
//   });
});



function showMachineCodeInput() {
var selectedMachineType = document.getElementById("MachineType").value; // machine types select here
var machineCodeInput = document.getElementById("machineCodeInput");

if (selectedMachineType !== "") {
machineCodeInput.style.display = "block";
} else {
machineCodeInput.style.display = "none";
}
}


function showServiceCodeInput() {
var selectedServiceType = document.getElementById("ServiceType").value; // Service types select here
var ServiceCodeInput = document.getElementById("ServiceCodeInput");

if (selectedServiceType !== "") {
ServiceCodeInput.style.display = "block";
} else {
ServiceCodeInput.style.display = "none";
}
}


// Get references to the input elements
var startDateInput = document.getElementById('Start-Date');
var endDateInput = document.getElementById('End-Date');
var totalWorkingDaysInput = document.getElementById('Total-Working-Days');
var workingDaysDiv = document.getElementById('workingDays');

// Add event listeners to handle date validation and calculate working days
startDateInput.addEventListener('input', handleDateChange);
endDateInput.addEventListener('input', handleDateChange);
totalWorkingDaysInput.addEventListener('input', handleTotalDaysChange);

function handleDateChange() {
var startDate = new Date(startDateInput.value);
var endDate = new Date(endDateInput.value);

// Check if the selected end date is less than the start date
if (endDate < startDate) {
alert('End date cannot be less than the start date.');
endDateInput.value = ''; // Clear the input value
} else {
var totalDays = calculateTotalDays(startDate, endDate);
totalWorkingDaysInput.value = totalDays; // Update total number of days
var workingDays = calculateWorkingDays(startDate, endDate);
workingDaysDiv.textContent = 'Total Number of days: ' + workingDays;
}
}

function handleTotalDaysChange() {
var totalDays = parseInt(totalWorkingDaysInput.value);
var startDate = new Date(startDateInput.value);
var endDate = new Date(endDateInput.value);
var workingDays = calculateWorkingDays(startDate, endDate);

if (totalDays < 1) {
alert('Total days must be at least 1.');
totalWorkingDaysInput.value = ''; // Clear the input value
} else if (totalDays > workingDays) {
alert('Total days cannot be greater than total working days.');
totalWorkingDaysInput.value = workingDays; // Set the value to the maximum allowed
}
}

function calculateTotalDays(startDate, endDate) {
// Calculate the difference in milliseconds between the two dates
var difference = Math.abs(endDate - startDate);

// Convert the difference to days
var daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

return daysDifference + 1; // Add 1 to include both start and end dates
}

function calculateWorkingDays(startDate, endDate) {
// Calculate the difference in milliseconds between the two dates
var difference = Math.abs(endDate - startDate);

// Convert the difference to days
var daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

return daysDifference + 1; // Add 1 to include both start and end dates as working days
}


let selectedAreaProblems = {};

// Define problems for each area
const problemsByArea = {
  MACHINE: ["DRIVE ALARM", "HARD LIMIT ALARM", "ZIG ZAG CUTTING", "CAPACITANCE SENSOR", "AXIS SENSOR", "OTION NOISE", "GAS PRESSURE ALARM", "AXIS SODT LIMIT", "GAS LEAKAGE", "GAS FLOW", "DIAGONAL", "COMMUNICATION BREAK", "OVALITY / CIRCULARITY", "EPR ISSUE", "OTHERS"],
  PALLET_SYSTEM: ["NO PALLET MOVEMENT", "PALLET A/B LIMIT ALARM", "PALLET SPEED PROBLEM", "PALLET SLOW LIMIT NOT WORKING", "PALLET CRASHING WITH LOCKING SYSTEM/STOPPER", "PALLET MAKING NOISE DURING MOVEMENT", "PPALLET CHAIN BROKEN", "PALLET CLAMPING ISSUE", "CHAIN GUIDE WEAR OUT/DAMAGE", "PALLET MOTOR MAKING NOICE", "VFD SHOWING ERROR", "PALLET RAIL AND WHEELS", "OTHERS"],
  CUTTING_HEAD: ["OPTICAL", "FREQLENT PROTECTION GAS DAMAGE","CERAMIC BRAKING","TRA PLATE DAMAGE","HEAD SENSING","HEAD TIP TOUCH","HEAD TEMPERATURE RISE / FALL","CAPACITANCE CALIBRATION","HEAD TEMPERATURE ALARM","HEAD CALIBRATION ","OTHERS"],
  SOFTWARE: ["SOFTWARE NOT BOOTING UP", "LICENSE EXPIRE","PLC NOT RUNNING", "HMI PARAMETER GOT CHANGED","GHOST INSTALL","HMI MALFUNCTION","HMI GOT STUCK","CUTTING LAYER NOT WORKING","HMI LANGUAGE GOT CHANGED","UNWANTED ALARMS GENERATED","NO LOADING PARAMETERS","CUTTING LAYER NOT WORKING","MATERIAL BURNING","FLIM CUT","OTHERS"],
  LASER: ["CRITICAL ERROR", "FIBER INTERLOCK","PS ALARM","LOW TEMPERATURE ALARM","HIGH TEMPERATUE ALARM","OVERHEAT","BACK REFLECTION","AIMING BEAM ALARM","PS FAILURE","OTHERS"],
  CHILLER: ["LOW TEMPERATURE", "WATER LEAKAGE","WATER PUMP CREATING LOUD NOICE","FAN NOT WORKING","COMPRESSOR NOT WORKING","WATER LEVEL ALARM","COMPRESSOR MAKING LOUD NOICE","BIG TANK WATER PUMP NOT WORKING","SMALL TANK WATER PUMP NOT WORKING","OTHERS"],
  EXHAUST_SUCTION: ["BLOWER / FUME EXTRACTOR MCB TRIPPING", "SMOKE FROM BLOWER MOTOR","PLC NOT TURNING ON (FUME EXTACTOR)","SOLENOID VALVE NOT OPERATING","PURGE STORE CYCLE ISSSUE","AUTP FILTER CLEANING ","NO SUCTION ON UPPER PALLET","NO SUCTION ON BOTH PALLET","FLAPS NOT OPERATING","MULTIPLE FLAPS OPENING SAME TIME","OTHERS"],
  NESTING_SOFTWARE: ["COMMON CUT", "SIGMANEST SOFTWARE INSTALLATION","E-CAT SOFTWARE INSTALLATION","POST ERROR","NC FILE NOT GENETRAING","DXF / DWG FILE IMPORT","REPORT GENERATION","NC FILE WRONG STRUCTURE","OTHERS"],
  CUTTING_APPLICATIONS: ["OTHERS"],
  OTHER_TYPE_ISSUES: ["OTHERS"],
  // Add problems for other areas here
};

// Function to update selected areas
function updateSelectedAreas() {
const selectedAreas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
let problemsHtml = '';

selectedAreaProblems = {}; // Reset selected problems object

// Join selected areas with commas directly
const selectedAreasString = selectedAreas.join(',');

selectedAreas.forEach(area => {
problemsHtml += `<h3>${area}</h3>`;
problemsHtml += '<div>';
problemsHtml += problemsByArea[area].map((problem, index) => {
  return `<label><input type="checkbox" id="${problem}_${index}" name="${area}" value="${problem}" onchange="updateSelectedAreaProblem('${area}')"> ${problem}</label><br>`;
}).join('');
problemsHtml += '</div>';
});
document.getElementById('problems').innerHTML = problemsHtml;
document.getElementById('problemSelection').style.display = selectedAreas.length > 0 ? 'block' : 'none';

// Set the value of the selected areas as a comma-separated string
document.getElementById('selectArea').value = selectedAreasString;
}


function updateSelectedAreaProblem(selectedArea) {
const selectedProblems = Array.from(document.querySelectorAll('input[name="' + selectedArea + '"][type="checkbox"]:checked')).map(checkbox => checkbox.value);
selectedAreaProblems[selectedArea] = selectedProblems;

let temp = [];
Object.values(selectedAreaProblems).forEach(problems => {
temp = temp.concat(problems);
});

// Join selected problems with commas directly
document.getElementById('selectedProblems').value = temp.join(',');
}


// FETCH FIRST AND LAST NAME
document.getElementById('EmpID').addEventListener('blur', function() {
  var empId = this.value;
  fetch('https://script.google.com/macros/s/AKfycbz22oMHNJRDu-wE3UPTXzyXsyg6WlZJGehuR2fVs5Ub7dpzFEQ9X_f0tNTDgkc5ytuoLA/exec?empId=' + empId)
  .then(response => response.json())
  .then(data => {
  if (data.engineer_Name) {
  document.getElementById('Engineer Name').value = data.engineer_Name;
  } else {
  // Display error message
  alert('First name and last name not found for employee ID ' + empId);
  // Clear the input field
  document.getElementById('Engineer Name').value = '';
  }
  })
  .catch(error => console.error('Error:', error));
  });
  
// image preview
function previewImage(event) {
  var preview = document.getElementById('preview');
  preview.style.display = "block";
  preview.src = URL.createObjectURL(event.target.files[0]);

  var file = event.target.files[0];
  var maxSize = 1024; // Maximum image size in KB
  compressImage(file, maxSize, function (compressedFile) {
    convertImageToBase64(compressedFile, function (base64) {
      document.getElementById('imageBase64').value = base64;
    });
  });
}

function convertImageToBase64(file, callback) {
  var reader = new FileReader();
  reader.onloadend = function () {
    var base64data = reader.result.split(',')[1];
    callback(base64data);
  };
  reader.readAsDataURL(file);
}

function compressImage(file, maxSize, callback) {
  var reader = new FileReader();
  reader.onload = function (event) {
    var img = new Image();
    img.src = event.target.result;
    img.onload = function () {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var maxWidth = 800;
      var maxHeight = 600;
      var width = img.width;
      var height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(function (blob) {
        callback(new File([blob], file.name));
      }, 'image/jpeg', 0.7); // 0.7 is the image quality
    };
  };
  reader.readAsDataURL(file);
}