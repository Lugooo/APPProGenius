<aside class="sidebar">
    <div class="contenedor-sidebar">
        <a href="/">
            <h2>ProGenius</h2>
        </a>
        <i id="cerrar-menu" class="fa-solid fa-xmark"></i>
    </div>
    <nav class="sidebar-nav">
        <a href="/crear-proyecto" class="link <?php echo ($titulo === "Crear Proyecto") ? "activo" : ""; ?>">
            <i class="fa-solid fa-plus"></i>
            Nuevo Proyecto
        </a>
        <a href="/proyectos" class="link <?php echo ($titulo === "Proyectos") ? "activo" : ''; ?>">
            <i class="fa-regular fa-folder-open"></i>
            Proyectos
        </a>
        <a href="/perfil" class="link <?php echo ($titulo === "Perfil") ? "activo" : ''; ?>">
            <i class="fa-regular fa-user"></i>
            Perfil
        </a>
    </nav>
</aside>