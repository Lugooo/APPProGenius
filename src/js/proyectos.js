//IIFE (Función Autoinvocada)
(function () {
  // Arreglo de proyectos
  let proyectos = [];

  // Espera a que se cargue el DOM antes de iniciar la aplicación
  document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
  });

  // Función de inicio de la aplicación
  function iniciarApp() {
    obtenerProyectos();
  }

  // Función para obtener proyectos desde una API
  async function obtenerProyectos() {
    try {
      /*       const url = `${location.origin}/api/proyectos`; */
      const url = '/api/proyectos';
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      proyectos = resultado.proyectos;
      mostrarProyectos();
    } catch (error) {
      console.log(error);
    }
  }

  // Función para mostrar proyectos en la interfaz
  function mostrarProyectos() {
    limpiarProyectos(); // Limpia la lista de proyectos existente

    const listadoProyectos = document.querySelector(".proyectos__listado");

    if (listadoProyectos) {
      if (proyectos.length === 0) {
        // Si no hay proyectos, muestra un mensaje
        const noProyectos = document.createElement("LI");
        noProyectos.classList.add("proyectos__no");
        noProyectos.textContent = "Aún no has creado ningún proyecto";

        listadoProyectos.appendChild(noProyectos);
      }

      // Itera sobre los proyectos y crea elementos HTML para cada uno
      proyectos.forEach((proyecto) => {
        const { id, nombre, url } = proyecto;

        const contenedorProyecto = document.createElement("LI");
        contenedorProyecto.classList.add("proyecto__contenedor");

        const nombreText = document.createElement("P");
        nombreText.classList.add("proyecto__nombre");
        nombreText.textContent = nombre;

        const opciones = document.createElement("DIV");
        opciones.classList.add("proyecto__opciones");

        const botonActualizar = document.createElement("I");
        botonActualizar.classList.add(
          "fa-solid",
          "fa-pen",
          "boton__actualizar"
        );
        botonActualizar.addEventListener("click", function () {
          mostrarFormulario(proyecto);
        });

        const botonEliminar = document.createElement("I");
        botonEliminar.classList.add("fa-solid", "fa-trash", "boton__eliminar");
        botonEliminar.addEventListener("click", function () {
          eliminarProyecto(proyecto);
        });

        const botonVer = document.createElement("I");
        botonVer.classList.add("fa-regular", "fa-eye", "boton__ver");
        botonVer.addEventListener("click", function () {
          window.location.href = `/proyecto?id=${url}`;
        });

        opciones.appendChild(botonVer);
        opciones.appendChild(botonActualizar);
        opciones.appendChild(botonEliminar);

        contenedorProyecto.appendChild(nombreText);
        contenedorProyecto.appendChild(opciones);
        listadoProyectos.appendChild(contenedorProyecto);
      });
    }
  }

  // Función para mostrar un formulario modal de edición de proyecto
  function mostrarFormulario(proyecto) {
    const modal = document.createElement("DIV");
    modal.classList.add("modal");

    // Crea un formulario dentro del modal
    modal.innerHTML = ` 
        <form class="formulario proyecto__editar">
            <legend>${"Editar Proyecto"}</legend>
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input 
                  type="text" 
                  name="nombre"
                  placeholder="Nombre Proyecto" 
                  id="nombre" 
                  value="${proyecto.nombre}">
            </div> 

            <div class="opciones">
                <input type="submit" class="submit-editar-proyecto" value="Guardar cambios">
                <button type="button" class="cerrar-modal">Cancelar</button>
            </div>
    </form>`;

    setTimeout(() => {
      const formulario = document.querySelector(".formulario");
      formulario.classList.add("animar");
    }, 0);

    modal.addEventListener("click", function (e) {
      e.preventDefault();

      if (e.target.classList.contains("cerrar-modal")) {
        const formulario = document.querySelector(".formulario");
        formulario.classList.add("cerrar");
        setTimeout(() => {
          modal.remove();
        }, 500);
      }

      if (e.target.classList.contains("submit-editar-proyecto")) {
        //Obtiene el valor del campo
        const nombreProyecto = document.querySelector("#nombre").value.trim();

        if (nombreProyecto === "") {
          Swal.fire("Error", "El campo nombre es obligatorio", "error");
          return;
        }

        proyecto.nombre = nombreProyecto;
        actualizarProyecto(proyecto);
      }
    });

    document.querySelector(".dashboard").appendChild(modal);
  }

  // Función para actualizar un proyecto
  async function actualizarProyecto(proyecto) {
    const { id, nombre } = proyecto;

    const datos = new FormData();
    datos.append("id", id);
    datos.append("nombre", nombre);

    try {
      const url = "/api/proyecto/actualizar";

      const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
      });

      const resultado = await respuesta.json();

      if (resultado.respuesta.tipo === "exito") {
        Swal.fire(
          "Actualizado Correctamente!",
          resultado.respuesta.mensaje,
          "success"
        );
        const modal = document.querySelector(".modal");

        if (modal) {
          setTimeout(() => {
            modal.remove();
          }, 1000);
        }

        // El método map() nos itera sobre el arreglo y crea uno nuevo
        proyectos = proyectos.map((proyectoMemoria) => {
          if (proyectoMemoria.id === id) {
            proyectoMemoria.nombre = nombre;
          }

          return proyectoMemoria;
        });

        mostrarProyectos();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* Eliminar Proyecto */
  async function eliminarProyecto(proyecto) {
    const { id, nombre } = proyecto;

    const datos = new FormData();
    datos.append("id", id);
    datos.append("nombre", nombre);

    try {
      const url = "/api/proyecto/eliminar";
      const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
      });

      const resultado = await respuesta.json();

      if (resultado.resultado) {
        Swal.fire("Eliminado!", resultado.mensaje, "success");

        proyectos = proyectos.filter(
          (proyectoMemoria) => proyectoMemoria.id !== id
        );
        mostrarProyectos();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Función para limpiar la lista de proyectos
  function limpiarProyectos() {
    const listadoProyectos = document.querySelector(".proyectos__listado");

    if (listadoProyectos) {
      while (listadoProyectos.firstChild) {
        listadoProyectos.removeChild(listadoProyectos.firstChild);
      }
    }
  }
})();
