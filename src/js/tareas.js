//IIFE
(function () {
  //Obtener tareas
  obtenerTareas();

  let tareas = [];

  let filtradas = [];

  //Botón para mostrar el modal de agregar tarea
  const btnNuevaTarea = document.querySelector("#agregar-tarea");
  btnNuevaTarea.addEventListener("click", function () {
    mostrarFormulario();
  });

  //Filtros de búsqueda
  const filtros = document.querySelectorAll("#filtros input[type='radio']");
  filtros.forEach((radio) => {
    radio.addEventListener("input", filtrarTareas);
  });

  //Método para filtrar tareas
  function filtrarTareas(e) {
    const filtro = e.target.value;
    if (filtro !== "") {
      filtradas = tareas.filter((tarea) => tarea.estado === filtro);
    } else {
      filtradas = [];
    }

    mostrarTareas();
  }

  //Obtener las tareas
  async function obtenerTareas() {
    try {
      const id = obtenerProyecto();
      const url = `/api/tareas?id=${id}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      tareas = resultado.tareas;
      mostrarTareas();
    } catch (error) {
      console.log(error);
    }
  }

  //Muestra las tareas
  function mostrarTareas() {
    limpiarTareas();
    totalPendientes();
    totalCompletadas();

    const arrayTareas = filtradas.length ? filtradas : tareas;

    if (arrayTareas.length === 0) {
      const listadoTareas = document.querySelector("#listado-tareas");

      const textoNoTareas = document.createElement("LI");
      textoNoTareas.textContent = "No hay tareas";
      textoNoTareas.classList.add("no-tareas");
      listadoTareas.appendChild(textoNoTareas);
      return;
    }

    //objeto de estados
    const estados = {
      0: "Pendiente",
      1: "Completada",
    };

    //Recorre el array de tareas
    arrayTareas.forEach((tarea) => {
      const contenedorTarea = document.createElement("LI");
      contenedorTarea.dataset.tareaId = tarea.id;
      contenedorTarea.classList.add("tarea");

      const nombreTarea = document.createElement("P");
      nombreTarea.textContent = tarea.nombre;
      nombreTarea.ondblclick = function () {
        mostrarFormulario((editar = true), { ...tarea });
      };

      const opcionesDiv = document.createElement("DIV");
      opcionesDiv.classList.add("opciones");

      //Botones
      const btnEstadoTarea = document.createElement("BUTTON");
      btnEstadoTarea.classList.add("estado-tarea");
      btnEstadoTarea.classList.add(`${estados[tarea.estado].toLowerCase()}`);
      btnEstadoTarea.textContent = estados[tarea.estado];
      btnEstadoTarea.dataset.estadoTarea = tarea.estado;
      btnEstadoTarea.ondblclick = function () {
        cambiarEstadoTarea({ ...tarea });
      };

      const btnEliminarTarea = document.createElement("BUTTON");
      btnEliminarTarea.classList.add("eliminar-tarea");
      btnEliminarTarea.dataset.idTarea = tarea.id;
      btnEliminarTarea.textContent = "Eliminar";
      btnEliminarTarea.ondblclick = function () {
        confirmarEliminarTarea({ ...tarea });
      };

      opcionesDiv.appendChild(btnEstadoTarea);
      opcionesDiv.appendChild(btnEliminarTarea);

      contenedorTarea.appendChild(nombreTarea);
      contenedorTarea.appendChild(opcionesDiv);

      const listadoTareas = document.querySelector("#listado-tareas");
      listadoTareas.appendChild(contenedorTarea);
    });
  }

  //Total de tareas pendientes
  function totalPendientes() {
    const totalPendientes = tareas.filter((tarea) => tarea.estado === "0");
    const pendientesRadio = document.querySelector("#pendientes");

    if (totalPendientes.length === 0) {
      pendientesRadio.disabled = true;
    } else {
      pendientesRadio.disabled = false;
    }
  }

  //Total de tareas completadas
  function totalCompletadas() {
    const totalCompletadas = tareas.filter((tarea) => tarea.estado === "1");
    const completadasRadio = document.querySelector("#completadas");

    if (totalCompletadas.length === 0) {
      completadasRadio.disabled = true;
    } else {
      completadasRadio.disabled = false;
    }
  }

  //Mostrar el formulario
  function mostrarFormulario(editar = false, tarea = {}) {
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.innerHTML = ` 
        <form class="formulario nueva-tarea">
            <legend>${
              editar ? "Editar tarea" : "Añade una nueva tarea"
            }</legend>
            <div class="campo">
                <label for="tarea">Tarea</label>
                <input 
                  type="text" 
                  name="tarea"
                  placeholder="${
                    tarea.nombre
                      ? "Edita la tarea"
                      : "Añadir tarea al proyecto actual"
                  }" 
                  id="tarea" 
                  value="${tarea.nombre ? tarea.nombre : ""}">
            </div> 

            <div class="opciones">
                <input type="submit" class="submit-nueva-tarea" value="${
                  editar ? "Guardar cambios" : "Añadir tarea"
                }">
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

      if (e.target.classList.contains("submit-nueva-tarea")) {
        //Obtiene el valor del campo
        const nombreTarea = document.querySelector("#tarea").value.trim();

        if (nombreTarea === "") {
          Swal.fire("Error", "El campo nombre es obligatorio", "error");
          return;
        }

        if (editar) {
          tarea.nombre = nombreTarea;
          actualizarTarea(tarea);
        } else {
          agregarTarea(nombreTarea);
        }
      }
    });
    document.querySelector(".dashboard").appendChild(modal);
  }

  //Consultar el servidor para agregar una nueva tarea
  async function agregarTarea(tarea) {
    //Construir la petición
    const datos = new FormData();
    datos.append("nombre", tarea);
    datos.append("proyectoId", obtenerProyecto());

    try {
      const url = "/api/tarea";

      const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
      });

      const resultado = await respuesta.json();

      if (resultado.tipo === "exito") {
        Swal.fire("Creado Correctamente!", resultado.mensaje, "success");

        const modal = document.querySelector(".modal");
        setTimeout(() => {
          modal.remove();
        }, 2000);

        //Agregar el objeto de Tarea al global de tareas
        const tareaObj = {
          id: String(resultado.id),
          nombre: tarea,
          estado: 0,
          proyectoId: resultado.proyectoId,
        };

        tareas = [...tareas, tareaObj];
        mostrarTareas();
      }
      /*         mostrarAlerta(
            resultado.mensaje,
            resultado.tipo,
            document.querySelector(".formulario legend")
          ); */
    } catch (error) {
      console.log(error);
    }
  }

  /* Validar campo */
  function validarCampo(valor, nombreCampo) {
    if (valor.trim() === "") {
      console.error(`El campo ${nombreCampo} está vacío.`);
      return false;
    }
    return true;
  }

  //Cambiar estado a las tareas
  function cambiarEstadoTarea(tarea) {
    const nuevoEstado = tarea.estado === "1" ? "0" : "1";
    tarea.estado = nuevoEstado;
    filtradas = filtradas.filter((t) => t.id !== tarea.id); // Elimina la tarea de filtradas
    mostrarTareas();
    actualizarTarea(tarea);
  }

  //Actualizar Tareas
  async function actualizarTarea(tarea) {
    const { estado, id, nombre } = tarea;

    const datos = new FormData();
    datos.append("id", id);
    datos.append("nombre", nombre);
    datos.append("estado", estado);
    datos.append("proyectoId", obtenerProyecto());

    /*     for (let valor of datos.values()) {
      console.log(valor);
    } */

    try {
      const url = "/api/tarea/actualizar";

      const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
      });

      const resultado = await respuesta.json();

      if (resultado.respuesta.tipo === "exito") {
        /*         mostrarAlerta(
          resultado.respuesta.mensaje,
          resultado.respuesta.tipo,
          document.querySelector(".contenedor-nueva-tarea")
        ); */

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

        //El método map() nos itera sobre el arreglo y crea uno nuevo
        tareas = tareas.map((tareaMemoria) => {
          if (tareaMemoria.id === id) {
            tareaMemoria.estado = estado;
            tareaMemoria.nombre = nombre;
          }

          return tareaMemoria;
        });

        mostrarTareas();
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Confirmar Eliminar la Tarea
  function confirmarEliminarTarea(tarea) {
    Swal.fire({
      title: "¿Eliminar Tarea?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      showCancelButton: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarTarea(tarea);
      }
    });
  }

  async function eliminarTarea(tarea) {
    const { estado, id, nombre } = tarea;

    const datos = new FormData();
    datos.append("id", id);
    datos.append("nombre", nombre);
    datos.append("estado", estado);
    datos.append("proyectoId", obtenerProyecto());

    try {
      const url = "/api/tarea/eliminar";
      const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
      });

      const resultado = await respuesta.json();
      if (resultado.resultado) {
        /* mostrarAlerta(
          resultado.mensaje,
          resultado.tipo,
          document.querySelector(".contenedor-nueva-tarea")
        ); */

        Swal.fire("Eliminado!", resultado.mensaje, "success");

        tareas = tareas.filter((tareaMemoria) => tareaMemoria.id !== tarea.id);
        mostrarTareas();
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Obetner el proyecto
  function obtenerProyecto() {
    const proyectoParams = new URLSearchParams(window.location.search);
    const proyecto = Object.fromEntries(proyectoParams.entries());
    return proyecto.id;
  }

  //LimpiarHtml
  function limpiarTareas() {
    const listadoTareas = document.querySelector("#listado-tareas");

    while (listadoTareas.firstChild) {
      listadoTareas.removeChild(listadoTareas.firstChild);
    }
  }

  //Muestra un mensaje en la interfaz
  function mostrarAlerta(mensaje, tipo, referencia) {
    //Previene la creacion de multiples alertas
    const alertaPrevia = document.querySelector(".alerta");
    if (alertaPrevia) {
      alerta.remove();
    }

    const alerta = document.createElement("DIV");
    alerta.classList.add("alerta", tipo);
    alerta.textContent = mensaje;

    //Inserta la alerta antes del legend
    referencia.parentElement.insertBefore(
      alerta,
      referencia.nextElementSibling
    );

    //Eliminar la alerta luego de 1s
    setTimeout(() => {
      alerta.remove();
    }, 1000);
  }
})();
