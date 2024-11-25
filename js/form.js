
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission (no page reload)

    // Collect form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value; // Convert FormData to JSON-like object
    });

    // Send the data to the backend
    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.message) {
                Swal.fire({
                    title: "El formulario se envio con exito!",
                    text: "Nos comunicaremos contigo lo mas pronto posible",
                    icon: "success",
                  });
            } else {
                Swal.fire({
                    title: "Error al enviar el formulario",
                    text: "Por favor intenta de nuevo",
                    icon: "error",
            });
        }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error de conexión al enviar el formulario.');
        });
});
