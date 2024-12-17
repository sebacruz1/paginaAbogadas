document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a FormData object to collect form input values
    const formData = new FormData(this);

    // Send the form data to the backend using fetch()
    fetch('submit.php', { // Change 'submit.php' if hosted on a different path
        method: 'POST',
        body: formData // Sends data as application/x-www-form-urlencoded
    })
    .then(response => response.json()) // Parse the JSON response from the server
    .then(result => {
        if (result.message) {
            // Show success message
            Swal.fire({
                title: "¡Éxito!",
                text: result.message,
                icon: "success"
            });
            // Reset the form
            document.getElementById('contact-form').reset();
        } else if (result.error) {
            // Show error message
            Swal.fire({
                title: "Error",
                text: result.error,
                icon: "error"
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Show connection error
        Swal.fire({
            title: "Error de conexión",
            text: "No se pudo conectar al servidor.",
            icon: "error"
        });
    });
});
