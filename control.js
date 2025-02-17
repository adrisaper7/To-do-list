
const EJEMPLO_NOTA= ["numero_nota", "Completada", "titulo", "Contenido", "Classe", "Color", "Hora hecha", "Hora completada"]


function crear_nota(numero_nota, titulo, clase, color, array_notas){
    nueva_nota = [numero_nota, false, titulo, null, clase, color, Date.now(), null]
    array_notas.append(nueva_nota)
}


let array_notas = [EJEMPLO_NOTA]
let numero_nota = 1;
let mas_notas = document.getElementById("mas_notas")

mas_notas.addEventListener("click", function() {

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    
    let boton = document.createElement("button")

    let selector_colores = document.createElement("input");
    selector_colores.type = "color";

    let div_notas = document.createElement("div")

    div_notas.appendChild(checkbox)
    div_notas.appendChild(boton);
    div_notas.appendChild(selector_colores)
    
});