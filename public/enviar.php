<?php
/**
 * Endpoint del formulario de contacto de reserman.cl.
 * Recibe un POST, valida y envía una solicitud formal por correo a DESTINO.
 * Protecciones: campo trampa (honeypot), tiempo mínimo de llenado y límite por IP.
 */
declare(strict_types=1);

const DESTINO   = 'contacto@reserman.cl';        // quién recibe las solicitudes
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

$cuerpo = "Estimados Reserman:\n\n"
    . "Se ha recibido una nueva solicitud a través del sitio web.\n\n"
    . "DATOS DEL SOLICITANTE\n"
    . "---------------------\n"
    . "Nombre:    $nombre\n"
    . "Empresa:   " . ($empresa !== '' ? $empresa : '—') . "\n"
    . "Correo:    $email\n"
    . "Teléfono:  " . ($telefono !== '' ? $telefono : '—') . "\n\n"
    . "SERVICIO DE INTERÉS\n"
    . "-------------------\n"
    . ($servicio !== '' ? $servicio : 'No especificado') . "\n\n"
    . "MENSAJE\n"
    . "-------\n"
    . $mensaje . "\n\n"
    . "--\n"
    . "Enviado desde reserman.cl el $fecha (hora de Chile).\n"
    . "Para responder, utilice la opción Responder: el correo del solicitante está configurado como destinatario.\n";

$nombre_mime = mb_encode_mimeheader($nombre, 'UTF-8', 'B');
$cabeceras = [
    'From: ' . mb_encode_mimeheader('Sitio web Reserman', 'UTF-8', 'B') . ' <' . REMITENTE . '>',
    'Reply-To: ' . $nombre_mime . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
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
