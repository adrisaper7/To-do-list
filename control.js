
const EJEMPLO_NOTA= ["numero_nota", "Completada", "titulo", "Contenido", "Classe", "Color", "Hora hecha", "Hora completada"]


function crear_nota(numero_nota, titulo, clase, color, array_notas){
    let nueva_nota = [numero_nota, false, titulo, "", clase, color, Date.now(), ""]
    array_notas.unshift(nueva_nota)
    return array_notas
}

function ordenarTarjetas() {
    let idOrdenar = document.getElementById("ordenar");
    


    if(idOrdenar.textContent === "ordenar por fecha"){
        idOrdenar.textContent = "ordenar por otra cosa";

    }
    else{
        idOrdenar.textContent = "ordenar por fecha";
    }
}

document.getElementById("ordenar").addEventListener("click", ordenarTarjetas);

//Obtener fecha actual
function crearFechaYhora(){
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); 
    const meses = Number(mes);
    const dia = String(ahora.getDate()).padStart(2, '0');
    const dias = Number(dia);
    const hora = String(ahora.getHours()).padStart(2, '0');
    const horas = Number(hora);
    const minuto = String(ahora.getMinutes()).padStart(2, '0');
    const minutos = Number(minuto);
    const segundo = String(ahora.getSeconds()).padStart(2, '0');
    const segundos = Number(segundo);
    return {
        dias: dias,
        meses: meses,
        año: año,
        horas: horas,
        minutos: minutos,
        segundos: segundos
    }
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
            checkbox.className = "finalizado?";
            checkbox.style.width = "18px";
            checkbox.style.height = "18px";
            checkbox.style.marginRight = "10px"; // Espacio entre checkbox y botóncheckbox.id = "TerminarTarea"+ numero_nota; // id del boton terminar tarea

    
            let fechaYhoraCreacion = crearFechaYhora();
        
            let diaC = fechaYhoraCreacion.dias;
            let mesC = fechaYhoraCreacion.meses;
            let añoC = fechaYhoraCreacion.año;
        
            let horasC = fechaYhoraCreacion.horas;
            let minutosC = fechaYhoraCreacion.minutos;
            let segundosC = fechaYhoraCreacion.segundos;
        
                checkbox.fechaYhoraCreada = fechaYhoraCreacion;
        
                console.log("Creado en "+ diaC + "/" + mesC + "/" + añoC + " " + horasC + ":" + minutosC + ":" + segundosC);
        
                function CalcularTiempo(){
                     //let checkbox = document.getElementById("TerminarTarea"+ numero_nota);
                    console.log(checkbox.checked);
                      if(checkbox.checked){
                          let fechaYhoraFinalizacion = crearFechaYhora();
        
                          let diaF = fechaYhoraFinalizacion.dias;
                          let mesF = fechaYhoraFinalizacion.meses;
                          let añoF = fechaYhoraFinalizacion.año;
                      
                          let horasF = fechaYhoraFinalizacion.horas;
                          let minutosF = fechaYhoraFinalizacion.minutos;
                          let segundosF = fechaYhoraFinalizacion.segundos;
        
                          checkbox.fechaYhoraFinalizada = fechaYhoraFinalizacion;
        
                          console.log("Finalizado en " + diaF + "/" + mesF + "/" + añoF + " " + horasF + ":" + minutosF + ":" + segundosF);
                          
                        let diasH = diaF - diaC;
                        let mesH = mesF - mesC;
                        let añoH = añoF - añoC;
        
                        let horaH = horasF - horasC;
                        let minutoH = minutosF - minutosC;
                        let segundoH = segundosF - segundosC;
        
                        let TiempoRealizacionTarea = {diasH, mesH, añoH, horaH, minutoH, segundoH}
        
                        checkbox.TiempoRealizacionTarea = TiempoRealizacionTarea;
        
                        if(checkbox.TiempoRealizacionTarea.minutoH == 0){
                            console.log("Tarea realizada en " + checkbox.TiempoRealizacionTarea.segundoH + " segundos.");
                        }
        
                       else if(checkbox.TiempoRealizacionTarea.horaH == 0){
                            console.log("Tarea realizada en " + checkbox.TiempoRealizacionTarea.minutoH + 
                                " minutos y " + checkbox.TiempoRealizacionTarea.segundoH + " segundos.");
                        }
        
                        else if(checkbox.TiempoRealizacionTarea.diasH == 0){
                            console.log("Tarea realizada en " + checkbox.TiempoRealizacionTarea.horaH + " horas," + checkbox.TiempoRealizacionTarea.minutoH + 
                                " minutos y " + checkbox.TiempoRealizacionTarea.segundoH + " segundos.");
                        }
                          
        
                      }
                      else{
                          checkbox.fechaYhoraFinalizada = "";
                      }
                  }
             
        
                checkbox.addEventListener("click", CalcularTiempo);

                
        

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
            boton.style.flex = "flex-flow: wrap-reverse";

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
            selector_colores.style.backgroundColor = color_contenido;
            selector_colores.id = "Color"+ numero_nota;


            let boton_eliminar = document.createElement("button");
            boton_eliminar.textContent = "X";
            boton_eliminar.style.marginLeft = "1px";
            boton_eliminar.style.border = "none";
            boton_eliminar.style.backgroundColor = "#ff4d4d"; // Rojo
            boton_eliminar.style.color = "white";
            boton_eliminar.style.cursor = "pointer";
            boton_eliminar.style.padding = "5px 10px";
            boton_eliminar.style.borderRadius = "5px";
            boton_eliminar.style.fontSize = "14px";

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
            div_notas.appendChild(boton_eliminar);

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

