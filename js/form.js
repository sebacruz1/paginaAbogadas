document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('submit.php', { // Replace with your PHP endpoint
        method: 'POST',
        body: formData // No need for headers; browser handles them automatically
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 1) {
            Swal.fire({
                title: "¡Formulario enviado con éxito!",
                text: "Nos comunicaremos contigo lo más pronto posible.",
                icon: "success"
            });
            document.getElementById('contact-form').reset();
        } else {
            Swal.fire({
                title: "Error",
                text: result.error || "Por favor intenta de nuevo.",
                icon: "error"
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: "Error de conexión",
            text: "No se pudo conectar al servidor.",
            icon: "error"
        });
    });
});
