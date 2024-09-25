function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('entries')) || [];
  const tableBody = document.getElementById('entriesTable');
  tableBody.innerHTML = ''; // Clear the table

  entries.forEach(entry => {
    const newRow = `
      <tr class="bg-white border-t">
        <td class="px-4 py-2">${entry.name}</td>
        <td class="px-4 py-2">${entry.email}</td>
        <td class="px-4 py-2">${entry.password}</td>
        <td class="px-4 py-2">${entry.dob}</td>
        <td class="px-4 py-2">${entry.termsAccepted}</td>
      </tr>
    `;
    tableBody.innerHTML += newRow;
  });
}

// Check if age is between 18 and 55
function validateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
}

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const termsAccepted = document.getElementById('terms').checked;

  // Validate age
  const age = validateAge(dob);
  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old.");
    return;
  }

  // Retrieve existing entries from localStorage
  const entries = JSON.parse(localStorage.getItem('entries')) || [];

  // Create new entry
  const newEntry = {
    name,
    email,
    password,
    dob,
    termsAccepted
  };

  // Append the new entry to the entries array
  entries.push(newEntry);

  // Update localStorage
  localStorage.setItem('entries', JSON.stringify(entries));

  // Reload the table to reflect the new entry
  loadEntries();

  // Reset the form
  document.getElementById('registrationForm').reset();
});

// Load entries when the page is loaded
window.onload = loadEntries;
