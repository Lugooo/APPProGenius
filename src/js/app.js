document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mobileMenu();
  load();
  darkMode();
}

function mobileMenu() {
  const btnMobileMenu = document.querySelector("#menu");
  const sidebar = document.querySelector(".sidebar");
  const btnCerrarMenu = document.querySelector("#cerrar-menu");

  if (btnMobileMenu) {
    btnMobileMenu.addEventListener("click", function () {
      sidebar.classList.toggle("mostrar");
    });
  }

  if (btnCerrarMenu) {
    btnCerrarMenu.addEventListener("click", function () {
      sidebar.classList.remove("mostrar");
    });
  }

  window.addEventListener("resize", function () {
    //Elimina la clase de mostrar, en un tamaño de tablet
    const anchoPantalla = document.body.clientWidth;

    if (anchoPantalla >= 480) {
      sidebar.classList.remove("mostrar");
    }
  });
}

let dashboard = document.querySelector(".dashboard");

function darkMode() {
  const btnDarkMode = document.querySelector(".dark");
  if (dashboard) {
    btnDarkMode.addEventListener("click", function () {
      dashboard.classList.toggle("darkMode");
      store(dashboard.classList.contains("darkMode"));
    });
  }
}

function load() {
  if (dashboard) {
    const darkMode = localStorage.getItem("darkMode");
    if (!localStorage.getItem("darkMode")) {
      store(false);
    } else if (darkMode == "true") {
      dashboard.classList.add("darkMode");
    }
  }
}

function store(value) {
  localStorage.setItem("darkMode", value);
}
