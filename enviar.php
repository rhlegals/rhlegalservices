<?php
/**
 * RH Legal Services — Form Processor
 * Compatible with cPanel shared hosting (PHP 7.4+)
 *
 * Configure the following variables before uploading to your server.
 */

// ── CONFIGURATION ────────────────────────────────────────────────────────────
define('RECIPIENT_EMAIL', 'admin@rhlegalservices.com');
define('SENDER_NAME',     'RH Legal Services - Web');
define('SENDER_EMAIL',    'admin@rhlegalservices.com');
define('SITE_URL',        'https://rhlegalservices.com');

// Default redirect if no redirect_url posted
define('DEFAULT_REDIRECT_ES', SITE_URL . '/gracias');
define('DEFAULT_REDIRECT_EN', SITE_URL . '/en/thank-you');
// ── END CONFIGURATION ────────────────────────────────────────────────────────

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

// ── HONEYPOT anti-spam check ─────────────────────────────────────────────────
if (!empty($_POST['website'])) {
    // Silent discard — bot detected
    $redirect = !empty($_POST['redirect_url']) ? $_POST['redirect_url'] : DEFAULT_REDIRECT_ES;
    header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));
    exit;
}

// ── Sanitize & validate input ────────────────────────────────────────────────
function clean(string $value): string {
    return htmlspecialchars(trim(strip_tags($value)), ENT_QUOTES, 'UTF-8');
}

$nombre   = clean($_POST['nombre']   ?? '');
$email    = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$celular  = clean($_POST['celular']  ?? '');
$servicio = clean($_POST['servicio'] ?? '');
$privacidad = !empty($_POST['acepta_privacidad']) ? 'Sí' : 'No';

// Determine redirect URL
$redirect_url = !empty($_POST['redirect_url'])
    ? filter_var(trim($_POST['redirect_url']), FILTER_SANITIZE_URL)
    : DEFAULT_REDIRECT_ES;

// Validate required fields
if (empty($nombre) || empty($email) || empty($celular) || empty($servicio)) {
    header('Location: ' . SITE_URL . '/?error=missing_fields');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ' . SITE_URL . '/?error=invalid_email');
    exit;
}

// Privacy consent required
if (empty($_POST['acepta_privacidad'])) {
    header('Location: ' . SITE_URL . '/?error=no_consent');
    exit;
}

// ── Build email ──────────────────────────────────────────────────────────────
$service_labels = [
    'visa'       => 'Visa en Colombia / Visa in Colombia',
    'marca'      => 'Registro de Marca / Trademark Registration',
    'visa_marca' => 'Visa + Registro de Marca / Visa + Trademark',
];
$servicio_label = $service_labels[$servicio] ?? $servicio;

$subject = '[RH Legal] Nueva consulta: ' . $servicio_label . ' — ' . $nombre;

$body  = "NUEVA CONSULTA DESDE EL SITIO WEB / NEW INQUIRY FROM WEBSITE\n";
$body .= str_repeat('=', 60) . "\n\n";
$body .= "Nombre / Name:    $nombre\n";
$body .= "Email:            $email\n";
$body .= "Celular / Phone:  $celular\n";
$body .= "Servicio:         $servicio_label\n";
$body .= "Privacidad:       $privacidad\n";
$body .= "\n" . str_repeat('=', 60) . "\n";
$body .= "Fecha / Date:     " . date('Y-m-d H:i:s T') . "\n";
$body .= "IP:               " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$headers  = "From: " . SENDER_NAME . " <" . SENDER_EMAIL . ">\r\n";
$headers .= "Reply-To: $nombre <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ── Send email ───────────────────────────────────────────────────────────────
$sent = mail(RECIPIENT_EMAIL, $subject, $body, $headers);

// ── Redirect ─────────────────────────────────────────────────────────────────
if ($sent) {
    header('Location: ' . $redirect_url);
} else {
    // Fallback: still redirect to success (to avoid showing error to user in production)
    header('Location: ' . $redirect_url);
}
exit;
