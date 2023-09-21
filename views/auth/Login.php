<div class="global login-background">

    <div class="contenedor login">
        <div class="izquierda">
            <!-- Template del nombre del sitio -->
            <?php include_once __DIR__ . '/../templates/nombre-sitio.php'; ?>
        </div>

        <div class="derecha">
            <p class="descripcion-pagina"><?php echo $titulo; ?></p>

            <!-- Template de alertas -->
            <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

            <form class="formulario" method="POST">
                <div class="campo">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Tu email" name="email">
                </div>
                <div class="campo">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Tu contraseña" name="password" autocomplete="password" >
                </div>

                <input type="submit" class="boton" value="Iniciar Sesión">
            </form>

            <div class="acciones">
                <a href="/crear">¿Aún no tienes una cuenta? Obtener una</a>
                <a href="/olvide">¿Olvidaste tu contraseña?</a>
            </div>
        </div>
    </div>
</div>

<!-- Template Footer -->
<?php include_once __DIR__ . '/../templates/footer.php'; ?>