<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{
    protected $email;
    protected $nombre;
    protected $token;


    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    //Envia mensaje de confirmación
    public function enviarConfirmacion()
    {
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV["EMAIL_HOST"];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV["EMAIL_PORT"];
        $mail->Username = $_ENV["EMAIL_USER"];
        $mail->Password = $_ENV["EMAIL_PASS"];

        $mail->setFrom("cuentas@progenius.com");
        $mail->addAddress("cuentas@progenius.com", "progenius.com");
        $mail->Subject = "Confirma tu cuenta";

        $mail->isHTML(true);
        $mail->CharSet = "UTF-8";

        $contenido = "<HTML>";
        $contenido .= "<P>
                        <STRONG> Hola " . $this->nombre . "</STRONG> 
                        has creado tu cuenta en ProGenius, solo debes confirmarla en el siguiente enlace
                       </P>";
        $contenido .= "<P>Presiona aquí: <A href='". $_ENV["APP_URL"] ."/confirmar?token=" . $this->token .  "'>Confirmar Cuenta</A></P> ";
        $contenido .= "</P>Si tu no creaste esta cuenta puedes ignorar este mensaje</P>";
        $contenido .= "</HTML>";

        //Agrega el contenido al cuerpo del mail
        $mail->Body = $contenido;

        //Enviar el email
        $mail->send();
    }

    //Envia mensaje para recuperar contraseña
    public function reestablecerPassword()
    {
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV["EMAIL_HOST"];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV["EMAIL_PORT"];
        $mail->Username = $_ENV["EMAIL_USER"];
        $mail->Password = $_ENV["EMAIL_PASS"];

        $mail->setFrom("cuentas@progenius.com");
        $mail->addAddress("cuentas@progenius.com", "progenius.com");
        $mail->Subject = "Reestablece tu contraseña";

        $mail->isHTML(true);
        $mail->CharSet = "UTF-8";

        $contenido = "<HTML>";
        $contenido .= "<P>
                        <STRONG> Hola " . $this->nombre . "</STRONG> 
                        has solicitado un cambio de constraseña, solo debes seguir el siguiente enlace
                       </P>";
        $contenido .= "<P>Presiona aquí: <A href='". $_ENV["APP_URL"] ."/reestablecer?token=" . $this->token .  "'>Reestablecer contraseña</A></P> ";
        $contenido .= "</P>Si tu no creaste esta cuenta puedes ignorar este mensaje</P>";
        $contenido .= "</HTML>";

        //Agrega el contenido al cuerpo del mail
        $mail->Body = $contenido;

        //Enviar el email
        $mail->send();
    }
}
