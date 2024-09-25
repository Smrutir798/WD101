// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Calculate the current date and the maximum allowable date of birth
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const formattedDate = minDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD

    // Validate that the date of birth is less than or equal to the max date
    if (dob > formattedDate) {
        alert("You must be at least 18 years old.");
        return; // Stop form submission
    }

    // Create a new row for the table
    const newRow = `
      <tr class="bg-white border-t">
        <td class="px-4 py-2">${name}</td>
        <td class="px-4 py-2">${email}</td>
        <td class="px-4 py-2">${password}</td>
        <td class="px-4 py-2">${dob}</td>
        <td class="px-4 py-2">${termsAccepted}</td>
      </tr>
    `;

    // Append the new row to the table body
    document.getElementById('entriesTable').innerHTML += newRow;

    // Reset the form
    document.getElementById('registrationForm').reset();

    // Reset the max attribute for the date input
    document.getElementById('dob').setAttribute('max', formattedDate);
});
