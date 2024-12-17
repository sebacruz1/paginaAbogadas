<?php

require '../vendor/autoload.php'; // Adjust path to Composer's autoload

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Allow CORS and set JSON response header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate and retrieve form data
    $nombre = isset($_POST['nombre']) ? htmlspecialchars(trim($_POST['nombre'])) : null;
    $numero = isset($_POST['numero']) ? htmlspecialchars(trim($_POST['numero'])) : null;
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : null;
    $interes = isset($_POST['interes']) ? htmlspecialchars(trim($_POST['interes'])) : null;

    // Check for required fields
    if ($nombre && $numero && $email && $interes) {
        try {
            // Initialize PHPMailer
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = 'mail.abogadasvregion.cl'; // SMTP host
            $mail->SMTPAuth = true;
            $mail->Username = 'hola@abogadasvregion.cl'; // SMTP username
            $mail->Password = $_ENV['EMAIL_PASS']; // SMTP password from .env
            $mail->SMTPSecure = 'ssl'; // Use SSL encryption
            $mail->Port = 465; // Port for SSL

            // Email settings
            $mail->setFrom('hola@abogadasvregion.cl', 'Website Contact Form');
            $mail->addAddress('hola@abogadasvregion.cl', 'Abogadas V Region'); // Recipient email
            $mail->addReplyTo($email, $nombre); // User-provided reply-to address

            // Email content
            $mail->isHTML(true);
            $mail->Subject = "Nuevo mensaje de contacto: $interes";
            $mail->Body = "
                <h3>Nuevo mensaje de contacto</h3>
                <p><strong>Nombre:</strong> $nombre</p>
                <p><strong>Número de Teléfono:</strong> $numero</p>
                <p><strong>Correo Electrónico:</strong> $email</p>
                <p><strong>Área de Interés:</strong> $interes</p>
            ";

            // Send email
            $mail->send();

            // Success response
            echo json_encode(['status' => 1, 'message' => 'Correo enviado correctamente.']);
            exit();
        } catch (Exception $e) {
            // Error response
            http_response_code(500);
            echo json_encode(['status' => 0, 'error' => 'Error al enviar el correo: ' . $mail->ErrorInfo]);
            exit();
        }
    } else {
        // Missing fields
        http_response_code(400);
        echo json_encode(['status' => 0, 'error' => 'Todos los campos son requeridos y deben ser válidos.']);
        exit();
    }
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(['status' => 0, 'error' => 'Método de solicitud no permitido.']);
    exit();
}
?>
