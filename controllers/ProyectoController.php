<?php


namespace Controller;

use MVC\Router;
use Model\Proyecto;

class ProyectoController
{

    public static function index(Router $router)
    {
        session_start();
        isAuth();

        $router->render("proyecto/index", [
            "titulo" => "Proyectos",
        ]);
    }

    public static function crearProyecto(Router $router)
    {
        session_start();

        isAuth();

        $alertas = [];

        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $proyecto = new Proyecto($_POST);

            //Validación
            $alertas = $proyecto->validarProyecto();

            if (empty($alertas)) {
                //Generar una ul única
                $proyecto->url = md5(uniqid());

                //Almacenar el creador del proyecto
                $proyecto->propietarioId = $_SESSION["id"];

                //Guardar el proyecto
                $proyecto->guardar();

                //Redireccionar
                header("Location: /proyecto?id=" . $proyecto->url);
            }
        }

        $router->render("proyecto/crear-proyecto", [
            "titulo" => "Crear Proyecto",
            "alertas" => $alertas
        ]);
    }

    public static function APIProyectos()
    {
        session_start();
        isAuth();
        //Obtener el id del usuario
        $id = $_SESSION["id"];
        $proyectos = Proyecto::belongsTo("propietarioId", $id);

        echo json_encode(["proyectos" => $proyectos]);
    }

    public static function actualizarProyecto(Router $router)
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {

            //Validar que el proyecto exista
            $proyecto = Proyecto::find($_POST["id"]);
            session_start();

            if (!$proyecto || $proyecto->propietarioId !== $_SESSION["id"]) {
                $respuesta = [
                    "tipo" => "error",
                    "mensaje" => "Hubo un error al actualizar el proyecto"
                ];

                echo json_encode($respuesta);
                return;
            }

            $proyecto->nombre = $_POST["nombre"];

            $resultado = $proyecto->guardar();
            if ($resultado) {
                $respuesta = [
                    "tipo" => "exito",
                    "id" => $proyecto->id,
                    "mensaje" => "Proyecto Actualizado Correctamente"
                ];

                echo json_encode(["respuesta" => $respuesta]);
            }
        }
    }

    public static function eliminarProyecto(Router $router)
    {

        if ($_SERVER["REQUEST_METHOD"] === "POST") {

            $id = intval($_POST["id"]);
            $proyecto = Proyecto::find($id);
            //Validar que el proyecto exista
            $proyecto = Proyecto::where("id", $_POST["id"]);

            session_start();

            if (!$proyecto || $proyecto->propietarioId !== $_SESSION["id"]) {
                $respuesta = [
                    "tipo" => "error",
                    "mensaje" => "Hubo un error al eliminar el proyecto"
                ];

                echo json_encode($respuesta);
                return;
            }


            $resultado = $proyecto->eliminar();

            $resultado = [
                "resultado" => $resultado,
                "mensaje" => "Eliminado Correctamente",
                "tipo" => "exito"
            ];

            echo json_encode($resultado);
        }
    }

    public static function proyecto(Router $router)
    {

        session_start();

        isAuth();

        $alertas = [];

        $token = $_GET["id"];

        if (!$token) header("Location: /proyectos");

        //Verificar que la persona que crea el proyecto, es quien lo creo
        $proyecto = Proyecto::where("url", $token);

        if ($proyecto->propietarioId !== $_SESSION["id"]) {
            header("Location: /proyectos");
        }

        $router->render("proyecto/proyecto", [
            "titulo" => $proyecto->nombre,
            "alertas" => $alertas
        ]);
    }
}
