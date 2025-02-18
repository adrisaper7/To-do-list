
const EJEMPLO_NOTA= ["numero_nota", "Completada", "titulo", "Contenido", "Classe", "Color", "Hora hecha", "Hora completada"]


function crear_nota(numero_nota, titulo, clase, color, array_notas){
    nueva_nota = [numero_nota, false, titulo, null, clase, color, Date.now(), null]
    array_notas.append(nueva_nota)
}


let array_notas = [EJEMPLO_NOTA]
let numero_nota = 1;
let mas_notas = document.getElementById("mas_notas")
let contenedor_notas = document.getElementById("contenedor_notas")

mas_notas.addEventListener("click", function() { 
    console.log("hola");

    let checkbox = document.createElement("input"); //Crear checkbox
    checkbox.type = "checkbox";
    checkbox.style.width = "18px";
    checkbox.style.height = "18px";
    checkbox.style.marginRight = "10px"; // Espacio entre checkbox y botón

    let boton = document.createElement("button"); //Crear boton
    boton.textContent = "Tareañdfkddddddddddddddddddddddddddddddddddddddlasñjfiejo";
    boton.textContent.maxWidth = "330px"
    boton.style.overflow = "hidden";
    boton.style.textOverflow = "ellipsis";
    boton.style.whiteSpace = "nowrap";
    boton.style.width = "auto";
    boton.style.maxWidth = "330px";
    boton.style.height = "34px";
    boton.style.border = "none";
    boton.style.backgroundColor = "#ffcc80"; // Color cálido para el botón
    boton.style.cursor = "pointer";
    boton.style.borderRadius = "5px"; // Bordes redondeados
    boton.style.boxShadow = "1px 1px 3px rgba(0,0,0,0.2)"; // Sombra ligera
    boton.style.fontWeight = "bold";
    boton.style.color = "#333"; // Color de texto más oscuro
    boton.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';

    let selector_colores = document.createElement("input"); //Crear input color
    selector_colores.type = "color";
    selector_colores.style.width = "34px";
    selector_colores.style.height = "34px";
    selector_colores.style.border = "none";
    selector_colores.style.padding = "0";
    selector_colores.style.cursor = "pointer";
    selector_colores.style.marginLeft = "10px";
    selector_colores.style.backgroundColor = "#ffcc80";// Espacio entre el botón y el selector

    let div_notas = document.createElement("div"); //crear div de cada nota
    div_notas.style.display = "flex";
    div_notas.style.alignItems = "center"; // Alinear verticalmente
    div_notas.style.justifyContent = "space-between"; // Espacio entre elementos
    div_notas.style.backgroundColor = "#ffcc80"; // Color amarillo claro
    div_notas.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)"; // Sombra para efecto elevado
    div_notas.style.width = "400px";
    div_notas.style.padding = "5px";
    div_notas.style.margin = "2px"; // Espaciado interno
    div_notas.style.borderRadius = "10px"; // Bordes más suaves
    div_notas.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
    div_notas.style.borderLeft = "5px solid #ffcc80"; // Línea decorativa en el lado izquierdo

    // Agregar elementos a la nota
    div_notas.appendChild(checkbox);
    div_notas.appendChild(boton);
    div_notas.appendChild(selector_colores);

    // 📌 Verificar si existe el contenedor de notas o crearlo
    let contenedor_notas = document.getElementById("contenedor_notas");
    div_notas.id = "Nota"+numero_nota;
    contenedor_notas.appendChild(div_notas);
    numero_nota+= 1;

});