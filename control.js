
const EJEMPLO_NOTA= ["numero_nota", "Completada", "titulo", "Contenido", "Classe", "Color", "Hora hecha", "Hora completada"]


function crear_nota(numero_nota, titulo, clase, color, array_notas){
    let nueva_nota = [numero_nota, false, titulo, "", clase, color, Date.now(), ""]
    array_notas.unshift(nueva_nota)
    return array_notas
}

//Obtener fecha actual
function crearFechaYhora(){
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Months are zero-based
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
    let numero_nota = 0;
    console.log(array_notas)
    for (let nota of array_notas){
        let texto = ""
        let numero = 0;
        for(let contenido of nota){
            console.log(contenido)
            if (contenido == 0){
                texto+= "0$/$"
            }
            else if (numero == nota.length-1){
            texto += contenido.toString()    
            }
            else if (contenido == ""){
                texto+= "$/$"
            }
            else {
            texto += contenido.toString()
            texto += "$/$"
            }
            numero++

        }

        localStorage.setItem(numero_nota, texto)
        numero_nota++
    }
}

function ordenar_array(array){
    let array_ordenat = []
    for(let i = array.length-1; i >= 0; i--){
        for (let j = 0; j < array.length; j++){
            console.log(i.toString())
            console.log(array[j][1])
            if(i.toString() == array[j][0]){
                array_ordenat.push(array[j])
                console.log(array[j])
            }
        }
    }
    return array_ordenat;
}

function coger_de_local(){
    let array_actualitzado = []
    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        let array_nota = value.split("$/$")
        array_actualitzado.push(array_nota)
    }
    array_actualitzado = ordenar_array(array_actualitzado)

    
    return array_actualitzado;
}

function mostrar_de_array(array_notas){
    document.getElementById("contenedor_notas").innerHTML = "";
    let numero_nota = 0;
    //Coger valor de los inputs
    for(nota of array_notas){
        let titulo_contenido = nota[2];
        let clase_contenido = nota[4];
        let color_contenido = nota[5];

        if (titulo_contenido != ""){ 
            let checkbox = document.createElement("input"); //Crear checkbox
            checkbox.type = "checkbox";
            checkbox.className = "finalizado?";
            checkbox.style.width = "18px";
            checkbox.style.height = "18px";
            checkbox.style.marginRight = "10px"; // Espacio entre checkbox y botón
            checkbox.id = "TerminarTarea"+ numero_nota; // id del boton terminar tarea

    
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
            boton.style.backgroundColor = "#ffcc80"; // Color cálido para el botón
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
    console.log("hola");


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
