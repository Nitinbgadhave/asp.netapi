document.getElementById('submitButton').addEventListener('click', function (event) {
    // Ask for permission before submitting
    if (!confirm('Are you sure you want to submit?')) {
        event.preventDefault(); // Prevent the default submit action if the user declines
    }
    //document.getElementById('form-group').relo();
    window.location.reload();

});

document.getElementById('dashboardLink').addEventListener('click', function (event) {
    // Ask for permission before navigating to the dashboard
    if (!confirm('Are you sure you want to go to the dashboard?')) {
        event.preventDefault(); // Prevent the default link action if the user declines
    }
});
 // Set today's date as the default value for the date input
document.getElementById('ReportDate').valueAsDate = new Date();

function showMachineCodeInput() {
var selectedMachineType = document.getElementById("MachineType").value; // machine types select here
var machineCodeInput = document.getElementById("machineCodeInput");

if (selectedMachineType !== "") {
machineCodeInput.style.display = "block";
} else {
machineCodeInput.style.display = "none";
}
}

// // calculate working hours
document.getElementById('Out-Time').addEventListener('change', function() {
let inTime = document.getElementById('In-Time').value;
let outTime = this.value;
let [inHours, inMinutes] = inTime.split(':').map(Number);
let [outHours, outMinutes] = outTime.split(':').map(Number);

let totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
let hours = Math.floor(totalMinutes / 60);
let minutes = totalMinutes % 60;

document.getElementById('Working-Hours').value = hours + ' hours ' + minutes + ' minutes';
});

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
