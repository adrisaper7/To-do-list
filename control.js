
const EJEMPLO_NOTA= ["numero_nota", "Completada", "titulo", "Contenido", "Classe", "Color", "Hora hecha", "Hora completada"]


function crear_nota(numero_nota, titulo, clase, color, array_notas){
    let nueva_nota = [numero_nota, false, titulo, null, clase, color, Date.now(), null]
    array_notas.push(nueva_nota)
    return array_notas
}

let array_notas = [EJEMPLO_NOTA]
let numero_nota = 1;

//Coger variables del documento
let mas_notas = document.getElementById("mas_notas")
let contenedor_notas = document.getElementById("contenedor_notas")
let titulo = document.getElementById("contenido");
let clase = document.getElementById("ordenar")
let color = document.getElementById("color_change")

function toggleMenu() {
    var menu = document.getElementById("popupMenu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Cerrar el menú si se hace clic fuera de él
document.addEventListener("click", function(event) {
    var menu = document.getElementById("popupMenu");
    var button = document.querySelector(".menu-container button");
    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.style.display = "none";
    }
});

mas_notas.addEventListener("click", function() { 
    console.log("hola");


    //Coger valor de los inputs

    let titulo_contenido = titulo.value;
    let clase_contenido = clase.value;
    let color_contenido = color.value;

    if (titulo_contenido != "")
        { let checkbox = document.createElement("input"); //Crear checkbox
        checkbox.type = "checkbox";
        checkbox.style.width = "18px";
        checkbox.style.height = "18px";
        checkbox.style.marginRight = "10px"; // Espacio entre checkbox y botón

        let boton = document.createElement("button"); //Crear boton
        boton.textContent = titulo_contenido;
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
        
        boton.addEventListener("dblclick", function() {
            let input_edicion = document.createElement("input");
            input_edicion.type = "text";
            input_edicion.value = boton.textContent;
            input_edicion.style.width = "auto";
            input_edicion.style.maxWidth = "330px";
            input_edicion.style.height = "30px";
            input_edicion.style.fontSize = "14px";
            input_edicion.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
            input_edicion.style.border = "1px solid #ccc";
            input_edicion.style.borderRadius = "5px";
            input_edicion.style.padding = "5px";
            
            // Reemplazar el botón con el input
            div_notas.replaceChild(input_edicion, boton);
            input_edicion.focus();
        
            // Guardar cambios cuando el usuario presione Enter o salga del input
            function guardarCambios() {
                let nuevo_texto = input_edicion.value.trim();
                if (nuevo_texto !== "") {
                    boton.textContent = nuevo_texto;
                    
                    // Buscar la nota en el array y actualizarla
                    let nota_id = parseInt(div_notas.id.replace("Nota", ""));
                    let nota_actual = array_notas.find(nota => nota[0] === nota_id);
                    if (nota_actual) {
                        nota_actual[2] = nuevo_texto; // Actualiza el título en array_notas
                    }
                    input_edicion.removeEventListener("blur", guardarCambios);
                    div_notas.replaceChild(boton, input_edicion); // Restaurar el botón
                    console.log("Notas actualizadas:", array_notas);
                }
            }
        
            input_edicion.addEventListener("blur", guardarCambios);
            input_edicion.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    guardarCambios();
                }
            });
        });
        

        let selector_colores = document.createElement("input"); //Crear input color
        selector_colores.type = "color";
        selector_colores.value = color_contenido;
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

        // Verificar si existe el contenedor de notas o crearlo
        let contenedor_notas = document.getElementById("contenedor_notas");
        div_notas.id = "Nota"+numero_nota;
        contenedor_notas.appendChild(div_notas);

        array_notas = crear_nota(numero_nota, titulo_contenido, clase_contenido, color_contenido, array_notas)
        numero_nota+= 1;

        console.log(array_notas)
    }
    else{
        alert("Titulo de la nota sin contenido");

    }


});