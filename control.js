
const EJEMPLO_NOTA= ["numero_nota", "Completada", "titulo", "Contenido", "Classe", "Color", "Hora hecha", "Hora completada"]


function crear_nota(numero_nota, titulo, clase, color, array_notas){
    let nueva_nota = [numero_nota, false, titulo, "", clase, color, Date.now(), ""]
    array_notas.unshift(nueva_nota)
    return array_notas
}


function guardar_en_local(array_notas){
    localStorage.setItem('myArray', JSON.stringify(array_notas));
}


function coger_de_local(){
    let datosGuardados = localStorage.getItem('myArray'); 

    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    } else {
        return [];
    }
}

function mostrar_de_array(array_notas){
    document.getElementById("contenedor_notas").innerHTML = "";
    let numero_nota = 0;
    //Coger valor de los inputs
    for(nota of array_notas){
        let titulo_contenido = nota[2];
        let color_contenido = nota[5];

        if (titulo_contenido != ""){ 
            let checkbox = document.createElement("input"); //Crear checkbox
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
            boton.style.backgroundColor = color_contenido; // Color cálido para el botón
            boton.style.cursor = "pointer";
            boton.style.borderRadius = "5px"; // Bordes redondeados
            boton.style.boxShadow = "1px 1px 3px rgba(0,0,0,0.2)"; // Sombra ligera
            boton.style.fontWeight = "bold";
            boton.style.color = "#333"; // Color de texto más oscuro
            boton.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';

            let selector_colores = document.createElement("input"); //Crear input color
            selector_colores.type = "color";
            selector_colores.value = color_contenido;
            selector_colores.style.width = "34px";
            selector_colores.style.height = "34px";
            selector_colores.style.border = "none";
            selector_colores.style.padding = "0";
            selector_colores.style.cursor = "pointer";
            selector_colores.style.marginLeft = "10px";
            selector_colores.style.backgroundColor = color_contenido;
            selector_colores.id = "Color"+ numero_nota;

            let div_notas = document.createElement("div"); //crear div de cada nota
            div_notas.style.display = "flex";
            div_notas.style.alignItems = "center"; // Alinear verticalmente
            div_notas.style.justifyContent = "space-between"; // Espacio entre elementos
            div_notas.style.backgroundColor = color_contenido; // Color amarillo claro
            div_notas.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)"; // Sombra para efecto elevado
            div_notas.style.width = "400px";
            div_notas.style.padding = "5px";
            div_notas.style.margin = "2px"; // Espaciado interno
            div_notas.style.borderRadius = "10px"; // Bordes más suaves
            div_notas.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
            div_notas.style.borderLeft = color_contenido

            // Agregar elementos a la nota
            div_notas.appendChild(checkbox);
            div_notas.appendChild(boton);
            div_notas.appendChild(selector_colores);

            // Verificar si existe el contenedor de notas o crearlo
            let contenedor_notas = document.getElementById("contenedor_notas");
            div_notas.id = "Nota"+numero_nota;
            contenedor_notas.appendChild(div_notas);
            numero_nota++;
        }
    }
}




let array_notas = coger_de_local()
console.log(array_notas)
let numero_nota = array_notas.length;
mostrar_de_array(array_notas)





//Coger variables del documento
let mas_notas = document.getElementById("mas_notas")
let contenedor_notas = document.getElementById("contenedor_notas")
let titulo = document.getElementById("contenido");
let clase = document.getElementById("ordenar")
let color = document.getElementById("color_change")

mas_notas.addEventListener("click", function() { 


    //Coger valor de los inputs

    let titulo_contenido = titulo.value;
    let clase_contenido = clase.value;
    let color_contenido = color.value;

    if (titulo_contenido != ""){ 
        

        let = crear_nota(numero_nota, titulo_contenido, clase_contenido, color_contenido, array_notas)
        numero_nota+= 1;


        guardar_en_local(array_notas)

        mostrar_de_array(array_notas)
    }
    else{
        alert("Titulo de la nota sin contenido");

    }


});

