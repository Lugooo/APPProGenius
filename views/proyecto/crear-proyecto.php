<!-- Header Dashboard -->
<?php include_once __DIR__ . "/../perfil/header-dashboard.php"; ?>

<div class="contenedor-sm">
    <!-- Template de alertas -->
    <?php include_once __DIR__ . "/../templates/alertas.php"; ?>

    <form class="formulario" method="POST" action="/crear-proyecto">
        <!-- Template formulario -->
        <?php include_once __DIR__ . "/formulario-proyecto.php"; ?>
        
        <input type="submit" class="boton" value="Crear Proyecto">
    </form>
</div>


<!-- Footer Dashboard -->
<?php include_once __DIR__. "/../perfil/footer-dashboard.php"; ?>