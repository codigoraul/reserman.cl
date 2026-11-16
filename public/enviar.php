<?php
/**
 * Endpoint del formulario de contacto de reserman.cl.
 * Recibe un POST, valida y envía una solicitud formal por correo a DESTINO.
 * Protecciones: campo trampa (honeypot), tiempo mínimo de llenado y límite por IP.
 */
declare(strict_types=1);

// PRUEBA: llega a codigoraul@gmail.com. Cuando esté validado, cambiar a 'contacto@reserman.cl'.
const DESTINO   = 'codigoraul@gmail.com';        // quién recibe las solicitudes
const REMITENTE = 'no-responder@reserman.cl';    // debe ser una dirección del propio dominio
const MAX_POR_HORA = 5;                          // solicitudes por IP y hora

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function responder(int $codigo, array $datos): void
{
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

function limpiar(string $valor, int $max): string
{
    $valor = trim(strip_tags($valor));
    $valor = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $valor) ?? '';
    return mb_substr($valor, 0, $max);
}

function una_linea(string $valor): string
{
    return trim(preg_replace('/\s+/', ' ', $valor) ?? '');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(405, ['ok' => false, 'error' => 'Método no permitido.']);
}

// Campo trampa: los bots lo llenan, las personas no lo ven. Se responde "ok" para no dar pistas.
if (!empty($_POST['sitio_web'])) {
    responder(200, ['ok' => true]);
}

// Tiempo mínimo de llenado (3 s): los envíos instantáneos son automáticos.
$cargado = (int) ($_POST['t'] ?? 0);
if ($cargado > 0 && (microtime(true) * 1000 - $cargado) < 3000) {
    responder(200, ['ok' => true]);
}

// Límite por IP
$ip = $_SERVER['REMOTE_ADDR'] ?? 'desconocida';
$archivo = sys_get_temp_dir() . '/rm_form_' . md5($ip);
$ahora = time();
$marcas = [];
if (is_file($archivo)) {
    $marcas = array_filter(array_map('intval', explode(',', (string) file_get_contents($archivo))),
        static fn(int $t): bool => $t > $ahora - 3600);
}
if (count($marcas) >= MAX_POR_HORA) {
    responder(429, ['ok' => false, 'error' => 'Se han enviado demasiadas solicitudes. Intente nuevamente más tarde.']);
}

// Datos
$nombre   = una_linea(limpiar((string) ($_POST['nombre'] ?? ''), 100));
$empresa  = una_linea(limpiar((string) ($_POST['empresa'] ?? ''), 120));
$email    = trim((string) ($_POST['email'] ?? ''));
$telefono = una_linea(limpiar((string) ($_POST['telefono'] ?? ''), 40));
$servicio = una_linea(limpiar((string) ($_POST['servicio'] ?? ''), 120));
$mensaje  = limpiar((string) ($_POST['mensaje'] ?? ''), 3000);

if ($nombre === '' || mb_strlen($mensaje) < 10 || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 150) {
    responder(422, ['ok' => false, 'error' => 'Revise los datos ingresados: nombre, correo y mensaje son obligatorios.']);
}

// Correo
date_default_timezone_set('America/Santiago');
$fecha = date('d-m-Y H:i');

$asunto = 'Solicitud de cotización' . ($servicio !== '' ? ' – ' . $servicio : '') . ' – ' . ($empresa !== '' ? $empresa : $nombre);

// Versión en texto plano (respaldo)
$texto = "Estimados Reserman:\n\n"
    . "Se ha recibido una nueva solicitud a través del sitio web.\n\n"
    . "DATOS DEL SOLICITANTE\n"
    . "Nombre:    $nombre\n"
    . "Empresa:   " . ($empresa !== '' ? $empresa : '—') . "\n"
    . "Correo:    $email\n"
    . "Teléfono:  " . ($telefono !== '' ? $telefono : '—') . "\n\n"
    . "SERVICIO DE INTERÉS\n"
    . ($servicio !== '' ? $servicio : 'No especificado') . "\n\n"
    . "MENSAJE\n"
    . $mensaje . "\n\n"
    . "--\nEnviado desde reserman.cl el $fecha (hora de Chile).\n";

// Versión HTML con estilos en línea (los clientes de correo no admiten CSS externo)
$h = static fn(string $v): string => htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
$fila = static function (string $etiqueta, string $valor) use ($h): string {
    return '<tr>'
        . '<td style="padding:10px 16px;width:140px;font-size:12px;font-weight:bold;letter-spacing:.06em;text-transform:uppercase;color:#807F7F;border-bottom:1px solid #D4D2D2;vertical-align:top;">' . $h($etiqueta) . '</td>'
        . '<td style="padding:10px 16px;font-size:15px;color:#4C484B;border-bottom:1px solid #D4D2D2;vertical-align:top;">' . $valor . '</td>'
        . '</tr>';
};
$html = '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
    . '<body style="margin:0;padding:0;background:#F4F1EB;font-family:Arial,Helvetica,sans-serif;">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F1EB;padding:24px 12px;"><tr><td align="center">'
    . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #D4D2D2;">'
    // Cabecera
    . '<tr><td style="background:#0B3B5F;padding:24px 28px;">'
    . '<div style="font-size:22px;font-weight:bold;color:#ffffff;letter-spacing:.04em;">RESERMAN</div>'
    . '<div style="font-size:11px;color:#D4D2D2;letter-spacing:.18em;text-transform:uppercase;margin-top:4px;">Soluciones Industriales</div>'
    . '</td></tr>'
    . '<tr><td style="background:#FEA901;height:4px;line-height:4px;font-size:0;">&nbsp;</td></tr>'
    // Título
    . '<tr><td style="padding:28px 28px 8px;">'
    . '<div style="font-size:11px;font-weight:bold;letter-spacing:.2em;text-transform:uppercase;color:#E86A10;">Nueva solicitud</div>'
    . '<h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:#0B3B5F;">' . $h($servicio !== '' ? $servicio : 'Solicitud de contacto') . '</h1>'
    . '<p style="margin:10px 0 0;font-size:14px;line-height:1.6;color:#4C484B;">Se ha recibido una nueva solicitud a través del sitio web.</p>'
    . '</td></tr>'
    // Datos
    . '<tr><td style="padding:16px 28px 8px;">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid #0B3B5F;">'
    . $fila('Nombre', $h($nombre))
    . $fila('Empresa', $empresa !== '' ? $h($empresa) : '—')
    . $fila('Correo', '<a href="mailto:' . $h($email) . '" style="color:#0B3B5F;font-weight:bold;text-decoration:none;">' . $h($email) . '</a>')
    . $fila('Teléfono', $telefono !== '' ? $h($telefono) : '—')
    . '</table></td></tr>'
    // Mensaje
    . '<tr><td style="padding:16px 28px 8px;">'
    . '<div style="font-size:12px;font-weight:bold;letter-spacing:.06em;text-transform:uppercase;color:#807F7F;margin-bottom:8px;">Mensaje</div>'
    . '<div style="background:#F4F1EB;border-left:4px solid #FEA901;padding:16px 18px;font-size:15px;line-height:1.65;color:#4C484B;">' . nl2br($h($mensaje), false) . '</div>'
    . '</td></tr>'
    // Botón responder
    . '<tr><td style="padding:20px 28px 28px;">'
    . '<a href="mailto:' . $h($email) . '?subject=' . rawurlencode('Re: ' . $asunto) . '" style="display:inline-block;background:#FEA901;color:#4C484B;font-weight:bold;font-size:14px;text-decoration:none;padding:12px 24px;border-radius:4px;">Responder al solicitante</a>'
    . '</td></tr>'
    // Pie
    . '<tr><td style="background:#F4F1EB;padding:16px 28px;font-size:12px;color:#807F7F;border-top:1px solid #D4D2D2;">'
    . 'Enviado desde reserman.cl el ' . $h($fecha) . ' (hora de Chile).'
    . '</td></tr>'
    . '</table></td></tr></table></body></html>';

$limite = 'rm_' . bin2hex(random_bytes(12));
$cuerpo = "--$limite\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
    . chunk_split(base64_encode($texto))
    . "--$limite\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
    . chunk_split(base64_encode($html))
    . "--$limite--\r\n";

$cabeceras = [
    'From: ' . mb_encode_mimeheader('Sitio web Reserman', 'UTF-8', 'B') . ' <' . REMITENTE . '>',
    'Reply-To: ' . mb_encode_mimeheader($nombre, 'UTF-8', 'B') . ' <' . $email . '>',
    'MIME-Version: 1.0',
    "Content-Type: multipart/alternative; boundary=\"$limite\"",
    'X-Mailer: reserman.cl',
];

$enviado = mail(
    DESTINO,
    '=?UTF-8?B?' . base64_encode($asunto) . '?=',
    $cuerpo,
    implode("\r\n", $cabeceras),
    '-f' . REMITENTE
);

if (!$enviado) {
    responder(500, ['ok' => false, 'error' => 'No fue posible enviar la solicitud.']);
}

$marcas[] = $ahora;
@file_put_contents($archivo, implode(',', $marcas));

responder(200, ['ok' => true]);
