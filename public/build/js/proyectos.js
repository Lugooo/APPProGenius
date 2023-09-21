!function(){let e=[];function t(){!function(){const e=document.querySelector(".proyectos__listado");if(e)for(;e.firstChild;)e.removeChild(e.firstChild)}();const o=document.querySelector(".proyectos__listado");if(o){if(0===e.length){const e=document.createElement("LI");e.classList.add("proyectos__no"),e.textContent="Aún no has creado ningún proyecto",o.appendChild(e)}e.forEach(n=>{const{id:a,nombre:c,url:r}=n,i=document.createElement("LI");i.classList.add("proyecto__contenedor");const s=document.createElement("P");s.classList.add("proyecto__nombre"),s.textContent=c;const d=document.createElement("DIV");d.classList.add("proyecto__opciones");const l=document.createElement("I");l.classList.add("fa-solid","fa-pen","boton__actualizar"),l.addEventListener("click",(function(){!function(o){const n=document.createElement("DIV");n.classList.add("modal"),n.innerHTML=` \n        <form class="formulario proyecto__editar">\n            <legend>Editar Proyecto</legend>\n            <div class="campo">\n                <label for="nombre">Nombre</label>\n                <input \n                  type="text" \n                  name="nombre"\n                  placeholder="Nombre Proyecto" \n                  id="nombre" \n                  value="${o.nombre}">\n            </div> \n\n            <div class="opciones">\n                <input type="submit" class="submit-editar-proyecto" value="Guardar cambios">\n                <button type="button" class="cerrar-modal">Cancelar</button>\n            </div>\n    </form>`,setTimeout(()=>{document.querySelector(".formulario").classList.add("animar")},0),n.addEventListener("click",(function(a){if(a.preventDefault(),a.target.classList.contains("cerrar-modal")){document.querySelector(".formulario").classList.add("cerrar"),setTimeout(()=>{n.remove()},500)}if(a.target.classList.contains("submit-editar-proyecto")){const n=document.querySelector("#nombre").value.trim();if(""===n)return void Swal.fire("Error","El campo nombre es obligatorio","error");o.nombre=n,async function(o){const{id:n,nombre:a}=o,c=new FormData;c.append("id",n),c.append("nombre",a);try{const o="/api/proyecto/actualizar",r=await fetch(o,{method:"POST",body:c}),i=await r.json();if("exito"===i.respuesta.tipo){Swal.fire("Actualizado Correctamente!",i.respuesta.mensaje,"success");const o=document.querySelector(".modal");o&&setTimeout(()=>{o.remove()},1e3),e=e.map(e=>(e.id===n&&(e.nombre=a),e)),t()}}catch(e){console.log(e)}}(o)}})),document.querySelector(".dashboard").appendChild(n)}(n)}));const m=document.createElement("I");m.classList.add("fa-solid","fa-trash","boton__eliminar"),m.addEventListener("click",(function(){!async function(o){const{id:n,nombre:a}=o,c=new FormData;c.append("id",n),c.append("nombre",a);try{const o="/api/proyecto/eliminar",a=await fetch(o,{method:"POST",body:c}),r=await a.json();r.resultado&&(Swal.fire("Eliminado!",r.mensaje,"success"),e=e.filter(e=>e.id!==n),t())}catch(e){console.log(e)}}(n)}));const u=document.createElement("I");u.classList.add("fa-regular","fa-eye","boton__ver"),u.addEventListener("click",(function(){window.location.href="/proyecto?id="+r})),d.appendChild(u),d.appendChild(l),d.appendChild(m),i.appendChild(s),i.appendChild(d),o.appendChild(i)})}}document.addEventListener("DOMContentLoaded",(function(){!async function(){try{const o="/api/proyectos",n=await fetch(o),a=await n.json();e=a.proyectos,t()}catch(e){console.log(e)}}()}))}();