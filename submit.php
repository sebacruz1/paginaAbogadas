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
            $mail->Host = 'smtp.gmail.com'; // SMTP host (Gmail example)
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['EMAIL_USER']; // SMTP username
            $mail->Password = $_ENV['EMAIL_PASS']; // SMTP password
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            // Email settings
            $mail->setFrom($_ENV['EMAIL_USER'], 'Website Contact Form');
            $mail->addAddress('sebastiancruzpomar@gmail.com', 'Sebastian'); // Replace with your email
            $mail->addReplyTo($email, $nombre);

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
            echo '1';
        } catch (Exception $e) {
            // Error response
            http_response_code(500);
            echo '2';
        }
    } else {
        // Missing field response
        http_response_code(400);
        echo json_encode(['error' => 'Todos los campos son requeridos y deben ser válidos.']);
    }
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(['error' => 'Método de solicitud no permitido.']);
}
?>
