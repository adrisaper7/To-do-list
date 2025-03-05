
const EJEMPLO_NOTA= ["numero_nota", "Completada", "titulo", "Contenido", "Classe", "Color", "Hora hecha", "Hora completada"]
const observer = new MutationObserver(actualizarInputsDeColor);

let inputs_de_color = document.querySelectorAll('input[type="color"]');
function actualizarInputsDeColor() {
    //const inputs_de_color = document.querySelectorAll('input[type="color"]');
    console.log(inputs_de_color); // Muestra los inputs de color actualizados
}

// Inicializa MutationObserver para observar cambios en el DOM

// Observa el body para cambios en los hijos (cuando se agregan o eliminan inputs)
observer.observe(document.body, {
    childList: true,
    subtree: true
});

function crear_nota(numero_nota, titulo, clase, color, fechaCreada, fechaFinalizacion, array_notas){
    let nueva_nota = [numero_nota, false, titulo, "", clase, color, fechaCreada, fechaFinalizacion, ""]
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
        ahora: ahora,
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
    //console.log(array_notas)
    for (let nota of array_notas){
        let texto = ""
        let numero = 0;
        for(let contenido of nota){
            console.log(contenido)

            if (typeof contenido === 'object' && contenido !== null) {
                // Convertir el objeto a una cadena de texto JSON
                contenido = JSON.stringify(contenido);
            }
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

        localStorage.setItem(numero_nota, JSON.stringify(texto));
        numero_nota++
    }
}

function ordenar_array(array){
    let array_ordenat = []
    for(let i = array.length-1; i >= 0; i--){
        for (let j = 0; j < array.length; j++){
            //console.log(i.toString())
            //console.log(array[j][1])
            if(i.toString() == array[j][0]){
                array_ordenat.push(array[j])
              //  console.log(array[j])
            }
        }
    }
    return array_ordenat;
}


function coger_de_local(){
    let array_actualitzado = []
    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));
        let array_nota = value.split("$/$")
        array_nota = array_nota.map(item => {
            if (item.startsWith('{') && item.endsWith('}')) {
                return JSON.parse(item);
            } else if (item === "0") {
                return 0;
            } else if (item === "$/$") {
                return "";
            } else {
                return item
            }
        });
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
        let color_contenido = nota[5];
    

        if (titulo_contenido != "" && nota){ 
            
            let checkbox = document.createElement("input"); //Crear checkbox
            checkbox.type = "checkbox";
            checkbox.id = "check" + numero_nota;
            checkbox.className = "finalizado?";
            checkbox.style.width = "18px";
            checkbox.style.height = "18px";
            checkbox.style.marginRight = "10px"; // Espacio entre checkbox y botóncheckbox.id = "TerminarTarea"+ numero_nota; // id del boton terminar tarea

            console.log(nota);

            const fechaCreacion = nota.find(item => typeof item === 'object');
            
            const fechaCreada = fechaCreacion.ahora;
            const añoC = fechaCreacion.año;
            const mesC = fechaCreacion.meses;
            const diaC = fechaCreacion.dias;

            const horaC = fechaCreacion.horas;
            const minutoC = fechaCreacion.minutos;
            const segundosC = fechaCreacion.segundos;
            
        
            console.log("Creado en "+ añoC + "/" + mesC + "/" + diaC + " " + horaC + ":" + minutoC + ":" + segundosC);
            
                checkbox.addEventListener("click", function (){
                     //let checkbox = document.getElementById("TerminarTarea"+ numero_nota);
                    console.log(checkbox.checked);
                    //const clicado = document.querySelector('input[type="checkbox"]:checked').value

                      if(checkbox.checked){
                        
                          const fechaYhoraFinalizacion = crearFechaYhora();
                          
                            //console.log(fechitaFind);

                            //console.log("Introducido" + nota[7]);
                            
                          let diaF = fechaYhoraFinalizacion.dias;
                          let mesF = fechaYhoraFinalizacion.meses;
                          let añoF = fechaYhoraFinalizacion.año;
                      
                          let horasF = fechaYhoraFinalizacion.horas;
                          let minutosF = fechaYhoraFinalizacion.minutos;
                          let segundosF = fechaYhoraFinalizacion.segundos;
        
                          checkbox.fechaYhoraFinalizada = fechaYhoraFinalizacion;
                          console.log("Creado en "+ añoC + "/" + mesC + "/" + diaC + " " + horaC + ":" + minutoC + ":" + segundosC);
                          console.log("Finalizado en " + diaF + "/" + mesF + "/" + añoF + " " + horasF + ":" + minutosF + ":" + segundosF);
                          
                          let diasH = diaF - diaC;
                          let mesH = mesF - mesC;
                          let añoH = añoF - añoC;

                          let horaH = horasF - horaC;                     
                          let minutoH = minutosF - minutoC;
                          let segundoH = segundosF - segundosC;

                         if (segundoH < 0) {
                            segundoH += 60;
                            minutoH -= 1;
                        }
                        if (minutoH < 0) {
                            minutoH += 60;
                            horaH -= 1;
                        }
                        if (horaH < 0) {
                            horaH += 24;
                            diasH -= 1;
                        }

                        let TiempoRealizacionTarea = {añoH, mesH, diasH, minutoH, segundoH};
        
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
                      
                        let check_id = parseInt(checkbox.id.replace("check", ""));
                        let check_actual = array_notas.find(nota => nota[0] === check_id);
                        if (check_actual) {
                            check_actual[7] = JSON.stringify(checkbox.fechaYhoraFinalizada); // Actualiza el título en array_notas
                        }
                    }
                    
                    else{
                        checkbox.fechaYhoraFinalizada = "";
                    }
        });
              
                //document.getElementById("check", numero_nota).addEventListener("click", CalcularTiempo);
                
                
                document.getElementById("ordenar").addEventListener("click", ordenarTarjetas);
        
            let boton = document.createElement("button"); //Crear boton
            boton.textContent = titulo_contenido;
            boton.style.overflow = "hidden";
            boton.style.textOverflow = "ellipsis";
            boton.style.whiteSpace = "nowrap";
            boton.style.width = "auto";
            boton.style.maxWidth = "330px";
            boton.style.height = "34px";
            boton.style.border = "none";
            boton.style.backgroundColor = "white"; // Color cálido para el botón
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
            inputs_de_color = document.querySelectorAll('input[type="color"]')
        }
    }
    addArrayListener();
}

let array_notas = coger_de_local()
//console.log(array_notas)
let numero_nota = array_notas.length;
mostrar_de_array(array_notas)

//Coger variables del documento
let mas_notas = document.getElementById("mas_notas")
let contenedor_notas = document.getElementById("contenedor_notas")
let titulo = document.getElementById("contenido");
let clase = document.getElementById("ordenar")
let color = document.getElementById("color_change")
let checkbox = document.getElementById("check"+ numero_nota);

mas_notas.addEventListener("click", function() { 

    //Coger valor de los inputs

    let titulo_contenido = titulo.value;
    let clase_contenido = clase.value;
    let color_contenido = color.value;
    let fechaCreada = crearFechaYhora();
    let fechaFinalizacion = "";

    if (titulo_contenido != ""){ 
        let = crear_nota(numero_nota, titulo_contenido, clase_contenido, color_contenido, fechaCreada, fechaFinalizacion, array_notas)
        numero_nota+= 1;

        console.log(array_notas);
        guardar_en_local(array_notas);

        mostrar_de_array(array_notas)
    }
    else{
        alert("Titulo de la nota sin contenido");
    }
});

function addArrayListener() {
    inputs_de_color.forEach((input) => {
        input.addEventListener('change', (event) => {
            if(input.id == "color_change"){}
            else{      
                let color = event.target.value;
                let numero_del_div = input.id.replace("Color", "");
                array_notas[parseInt(numero_del_div)][5] = color;
                guardar_en_local(array_notas)
                mostrar_de_array(array_notas)
            }

        });
        
    });
    
}
