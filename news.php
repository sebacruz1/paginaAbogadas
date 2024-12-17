<?php
require '../vendor/autoload.php'; 
use Dotenv\Dotenv;


$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// API Key and URL
$apiKey = $_ENV['NEWS_API_KEY'];
$apiURL = "https://newsdata.io/api/1/news?apikey={$apiKey}&country=cl&language=es&category=politics";

try {
    // Initialize cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiURL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);

    // Execute cURL and get response
    $response = curl_exec($ch);

    // Check for cURL errors
    if (curl_errno($ch)) {
        throw new Exception('cURL Error: ' . curl_error($ch));
    }

    // Close cURL
    curl_close($ch);

    // Decode the response from NewsData API
    $newsData = json_decode($response, true);

    // Check for valid results
    if (isset($newsData['results'])) {
        // Return results as JSON
        echo json_encode(['status' => 'success', 'results' => $newsData['results']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No se encontraron noticias.']);
    }
} catch (Exception $e) {
    // Handle errors
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
