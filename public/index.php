<?php 

require_once __DIR__ . '/../includes/app.php';

use Controller\PerfilController;
use Controller\LoginController;
use Controller\TareaController;
use Controller\UptaskController;
use Controller\ProyectoController;
use MVC\Router;
$router = new Router();

//Zona Pública
$router->get("/", [UptaskController::class, "index"]);

//Login
$router->get("/login", [LoginController::class, "login"]);
$router->post("/login", [LoginController::class, "login"]);
$router->get("/logout", [LoginController::class, "logout"]);

//Crear Cuenta
$router->get("/crear", [LoginController::class, "crear"]);
$router->post("/crear", [LoginController::class, "crear"]);

//Olvide Contraseña
$router->get("/olvide", [LoginController::class, "olvide"]);
$router->post("/olvide", [LoginController::class, "olvide"]);

//Nueva Contraseña
$router->get("/reestablecer", [LoginController::class, "reestablecer"]);
$router->post("/reestablecer", [LoginController::class, "reestablecer"]);

//Confirmar Nueva Cuenta
$router->get("/mensaje", [LoginController::class, "mensaje"]);
$router->get("/confirmar", [LoginController::class, "confirmar"]);

//Dashboard
$router->get("/perfil", [PerfilController::class, "perfil"]);
$router->post("/perfil", [PerfilController::class, "perfil"]);
$router->get("/cambiar-password", [PerfilController::class, "cambiarPassword"]);
$router->post("/cambiar-password", [PerfilController::class, "cambiarPassword"]);

//Proyectos
$router->get("/proyectos", [ProyectoController::class, "index"]);
$router->get("/api/proyectos", [ProyectoController::class, "APIProyectos"]);
$router->get("/crear-proyecto", [ProyectoController::class, "crearProyecto"]);
$router->post("/crear-proyecto", [ProyectoController::class, "crearProyecto"]);
$router->get("/api/proyecto/actualizar", [ProyectoController::class, "actualizarProyecto"]);
$router->post("/api/proyecto/actualizar", [ProyectoController::class, "actualizarProyecto"]);
$router->post("/api/proyecto/eliminar", [ProyectoController::class, "eliminarProyecto"]);
$router->get("/api/proyecto/eliminar", [ProyectoController::class, "eliminarProyecto"]);
$router->get("/proyecto", [ProyectoController::class, "proyecto"]);

//API Tareas
$router->get("/api/tareas", [TareaController::class, "index"]);
$router->post("/api/tarea", [TareaController::class, "crear"]);
$router->post("/api/tarea/actualizar", [TareaController::class, "actualizar"]);
$router->post("/api/tarea/eliminar", [TareaController::class, "eliminar"]);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();