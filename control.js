
const EJEMPLO_NOTA= ["numero_nota", "Completada", "titulo", "Contenido", "Classe", "Color", "Hora hecha", "Hora completada"]
const EJEMPLO_NOTAS = [
    [1, true, "Reunión de equipo", "Se discutieron las metas de la próxima semana y la asignación de tareas.", "Trabajo", "#0000FF", "2025-02-25 10:00", "2025-02-25 11:00"],
    [2, false, "Estudio de Matemáticas", "Repasar la teoría de álgebra y resolver ejercicios prácticos.", "Estudio", "#008000", "2025-02-25 14:00", null]
  ];
const observer = new MutationObserver(actualizarInputsDeColor);
let inputs_de_color = document.querySelectorAll('input[type="color"]');
let div_menu = null
let creando_menu = false
const boton_ordenar = document.getElementById("ordenar")
let ordenar = 0 // 0 = fecha, 1 = titulo, 2 = color, 3 = completadas
let array_notas = [];
let last_id = coger_last_id()
let numero_nota = last_id
let nombre_lista_actual = null;


function mostrar_llista_de_tareas(){
    let div_tareas = document.getElementById("tareas")
    div_tareas.style.display = "block"
    let div_llista = document.getElementById("llistas")
    div_llista.style.display = "none"
    

}
function coger_last_id(){
    let last_id = localStorage.getItem("last_id")
    if (last_id){
        return parseInt(last_id)
    } else {
        return 0
    }
}

function es_el_titulo_utlizado(titulo){
    for(let i = 0; i < localStorage.length; i++){
        if (localStorage.key(i) === titulo){
            return true
        }
    }
    return false
}

function boton_llista_listener(){
    let mas_listas = document.getElementById("mas_listas")
    console.log("mas listas" + mas_listas)
    mas_listas.addEventListener("click", function(){
        let nombre_lista = document.getElementById("contenido_lista").value
    
        if (nombre_lista != ""){
            if(!es_el_titulo_utlizado(nombre_lista) ){
            localStorage.setItem(nombre_lista, "")
            mostrar_lista_de_llistas()
            }
            else if (nombre_lista == "last_id"){
                alert("Nombre de la lista no permitido")
            }
            else {
                alert("Nombre de la lista ya utilizado")
            }
        }
        else {
            alert("Nombre de la lista sin contenido")
        }
    })
}
function girar_string(string){
    return string.split("").reverse().join("")
}
    
function guardar_last_id(){
    localStorage.setItem("last_id", numero_nota)
}


    function leer_botones_tareas(){
        let inputs_boton_lista = document.querySelectorAll('button.boton_lista');

        if (inputs_boton_lista !=  null){
            console.log(inputs_boton_lista)
            inputs_boton_lista.forEach(element => {
                console.log("hola")
                element.addEventListener("click", function(){
                    console.log("clicked")
                    let nombre_lista = girar_string(girar_string(element.textContent).replace("X", ""))
                    array_notas = coger_de_local(nombre_lista)
                    nombre_lista_actual = nombre_lista
                    let titulo_lista_de_tareas = document.getElementById("titulo_lista_de_tareas")
                    titulo_lista_de_tareas.textContent = nombre_lista
                    mostrar_llista_de_tareas()
                    mostrar_de_array(array_notas)

                }
                
                )
        
                
            });
        }
    }

function mostrar_lista_de_llistas(){
    let llistas_de_tareas = document.getElementById("listas_de_tareas")
    llistas_de_tareas.innerHTML = ""
    for(let i = 0; i < localStorage.length; i++){
        if (localStorage.key(i) === "last_id" || localStorage.key(i) === "null" || localStorage.key(i) === ""){
            console.log("no hago nada")
        }
        else {
            
        let boton_lista = document.createElement("button")
        boton_lista.className = "boton_lista"

        let p_titulo_lista_de_tareas = document.createElement("p1")
        p_titulo_lista_de_tareas.textContent = localStorage.key(i)
        p_titulo_lista_de_tareas.className = "titulo_lista_de_tareas"
        let boton_eliminar = document.createElement("button"); //Crear boton borrar
        boton_eliminar.textContent = "X";
        boton_eliminar.style.marginLeft = "1px";
        boton_eliminar.style.border = "none";
        boton_eliminar.style.backgroundColor = "#ff4d4d";
        boton_eliminar.style.color = "white";
        boton_eliminar.style.cursor = "pointer";
        boton_eliminar.style.padding = "5px 10px";
        boton_eliminar.style.borderRadius = "5px";
        boton_eliminar.style.fontSize = "14px";
        boton_eliminar.style.float = "right"
            boton_eliminar.addEventListener("click", function(e){
                e.stopPropagation()
            localStorage.removeItem(localStorage.key(i))
            mostrar_lista_de_llistas()
        })
        llistas_de_tareas.appendChild(boton_lista)
        boton_lista.appendChild(p_titulo_lista_de_tareas)
        boton_lista.appendChild(boton_eliminar)
        }
    }
    leer_botones_tareas()
    boton_llista_listener()
}


mostrar_lista_de_llistas() //Mostrar lista de tareas al iniciar la pagina


function ordenar_funcio(array_notas){
    if (ordenar == 0){ //ordenar por numero de nota
        array_notas.sort((a,b) => b[0] - a[0])
        guardar_en_local(array_notas)
        mostrar_de_array(array_notas)
        boton_ordenar.textContent = "Mas nueva"
    } 
    else if (ordenar == 1){ //ordenar por titulo
        array_notas.sort((a,b) => a[2].localeCompare(b[2]))
        guardar_en_local(array_notas)
        mostrar_de_array(array_notas)
        boton_ordenar.textContent = "Alfabeticamente"
    }
    else if(ordenar == 2){ //ordenar por color
        array_notas.sort((a,b) => a[5].localeCompare(b[5]))
        guardar_en_local(array_notas)
        mostrar_de_array(array_notas)
        boton_ordenar.textContent = "Color"
    }
    else if (ordenar == 3){ //ordenar por completadas
        array_notas.sort((a,b) => a[1] - b[1])
        guardar_en_local(array_notas)
        mostrar_de_array(array_notas)
        boton_ordenar.textContent = "Completada"
    }
    return array_notas
}

function actualizarInputsDeColor() {
    inputs_de_color = document.querySelectorAll('input[type="color"]');
    console.log(inputs_de_color); // Muestra los inputs de color actualizados
}

// Inicializa MutationObserver para observar cambios en el DOM


// Observa el body para cambios en los hijos (cuando se agregan o eliminan inputs)
observer.observe(document.body, {
    childList: true,
    subtree: true
});

function crear_nota(numero_nota, titulo, clase, color, array_notas){
    let nueva_nota = [numero_nota, false, titulo, "", clase, color, Date.now(), ""]
    array_notas.unshift(nueva_nota)
    array_notas = ordenar_funcio(array_notas)
    return array_notas
}


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
    if (nombre_lista_actual != null){
    localStorage.setItem(nombre_lista_actual, JSON.stringify(array_notas));
    }
}


function coger_de_local(nombre_lista){
    let datosGuardados = localStorage.getItem(nombre_lista); 

    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    } else {
        return [];
    }
}

function mostrar_de_array(array_notas){
    document.getElementById("contenedor_notas").innerHTML = "";;
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
            checkbox.style.marginRight = "10px";
            checkbox.id = "Checkbox" + nota[0]; // Espacio entre checkbox y botóncheckbox.id = "TerminarTarea"+ numero_nota; // id del boton terminar tarea

    
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
            boton.style.whiteSpace = "pre-wrap";
            boton.style.wordWrap = "break-word";
            boton.style.width = "auto";
            boton.style.maxWidth = "280px";
            boton.style.height = "auto";
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
                input_edicion.style.maxWidth = "280px";
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
            selector_colores.style.maxWidth = "34px";
            selector_colores.style.height = "34px";
            selector_colores.style.border = "none";
            selector_colores.style.padding = "0";
            selector_colores.style.cursor = "pointer";
            selector_colores.style.marginLeft = "10px";
            selector_colores.style.backgroundColor = color_contenido;
            selector_colores.id = "Color"+ nota[0];

            let boton_menu = document.createElement("button");
            boton_menu.textContent = "≣";
            boton_menu.className = "button";
            boton_menu.style.borderColor = "black";
            boton_menu.style.borderRadius = "5px";
            boton_menu.style.backgroundColor = "#ffffff";
            boton_menu.style.cursor = "pointer";


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
            div_notas.appendChild(boton_menu);
            div_notas.appendChild(boton_eliminar);
            

            // Verificar si existe el contenedor de notas o crearlo
            let contenedor_notas = document.getElementById("contenedor_notas");
            div_notas.id = "NOTA" + nota[0];
            contenedor_notas.appendChild(div_notas);
            
            inputs_de_color = document.querySelectorAll('input[type="color"]')
        }
    }
    actualizarInputsDeColor();
    addArrayListener();
    addmenuListener();
}


function abrir_menu(nota_array){
    creando_menu = false
    let numero_nota = array_notas.indexOf(nota_array)   
    let menu = document.getElementsByClassName("menu_pop_up")[0]
    if(menu){
        div_menu = null
        menu.remove()
    }
    else{

    setTimeout(function() {
        creando_menu = true
    }, 30);
    let div_menu = document.createElement("div"); //Creamos menu pop up
    div_menu.classList.add("menu_pop_up");
    div_menu.style.backgroundColor = nota_array[5]

    let boton_cerrar = document.createElement("button"); //Creamos boton de cerrar
    boton_cerrar.textContent = "✖";
    boton_cerrar.className = "boton_cerrar"

    let titulo_nota = document.createElement("textarea")
    titulo_nota.textContent = nota_array[2]
    titulo_nota.className = "titulo_nota"

    let contenido_nota = document.createElement("textarea");
    contenido_nota.textContent = nota_array[3]
    contenido_nota.className = "contenido_nota";

    let checkbox = document.createElement("input"); //Crear checkbox
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    let boton_guardar_cambios = document.createElement("button");
    boton_guardar_cambios.textContent = "Guardar cambios";
    boton_guardar_cambios.className = "boton_guardar_cambios";

    let cambiar_color = document.createElement("input");
    cambiar_color.type = "color";
    cambiar_color.value =  nota_array[5];
    cambiar_color.style.backgroundColor =  nota_array[5];
    cambiar_color.className = "cambiar_color";


    let fechacreaciontarea = document.createElement("p")
    fechacreaciontarea.textContent = "Fecha de creación de la tarea: 12/12/2021 12:12:12"
    fechacreaciontarea.className = "fechacreaciontarea"

    let fechacompletaciontarea = document.createElement("p")
    fechacompletaciontarea.textContent = "Fecha de completación de la tarea : 12/12/2021 12:12:12"
    fechacompletaciontarea.className = "fechacompletaciontarea"


    document.body.appendChild(div_menu);
    div_menu.appendChild(boton_cerrar);
    div_menu.appendChild(titulo_nota);
    div_menu.appendChild(contenido_nota);
    div_menu.appendChild(checkbox);
    div_menu.appendChild(boton_guardar_cambios);
    div_menu.appendChild(cambiar_color);
    div_menu.appendChild(fechacreaciontarea);
    div_menu.appendChild(fechacompletaciontarea);

    boton_cerrar.addEventListener("click", function() {
        abrir_menu()
    })

    let titulo = document.querySelector(".titulo_nota");
    let maxLength = 40;
    
    if (titulo) {
        titulo.setAttribute("contenteditable", "true");
        titulo.style.border = "1px solid #ccc";
    
        
        titulo.addEventListener("input", function () {
            let text = titulo.innerText; 
            if (text.length > maxLength) {
                titulo.innerText = text.substring(0, maxLength); 
            }
        });
    }


    boton_guardar_cambios.addEventListener("click", function() {
        nota_array[2] = titulo_nota.value;
        nota_array[3] = contenido_nota.value;
        nota_array[5] = cambiar_color.value;
        array_notas[numero_nota] = nota_array;
        div_menu.style.backgroundColor = nota_array[5]
        cambiar_color.style.backgroundColor =  nota_array[5];
        guardar_en_local(array_notas);
        mostrar_de_array(array_notas);`


        
        `
    })

    
}

}

console.log(array_notas)
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
        

        crear_nota(numero_nota, titulo_contenido, clase_contenido, color_contenido, array_notas)
        numero_nota += 1
        guardar_last_id()

        guardar_en_local(array_notas)

        mostrar_de_array(array_notas)
        
    
    }
    else{
        alert("Titulo de la nota sin contenido");

    }


});


function addArrayListener() {
    console.log(inputs_de_color)
    inputs_de_color.forEach((input) => {
        input.addEventListener('change', (event) => {
            if(input.id == "color_change"){}
            else{      
                let color = event.target.value;
                let numero_nota = input.id.replace("Color", "")
                console.log(numero_nota)
                let index = array_notas.findIndex(nota => nota[0] == numero_nota)
                array_notas[index][5] = color;
                guardar_en_local(array_notas)
                mostrar_de_array(array_notas)
            }

        });
    });
}

function addmenuListener() {
    let botones_menu = document.getElementsByClassName("button")
    for (let boton of botones_menu){
        boton.addEventListener("click", function(){
            console.log(array_notas)
            let numero_nota = boton.parentElement.id.replace("NOTA", "")
            console.log(numero_nota)
            let index = array_notas.findIndex(nota => nota[0] == numero_nota)
            console.log("index", index)
            abrir_menu(array_notas[index])
        })
    }
}

document.addEventListener("click", function(event) {
    console.log("click");
    console.log("Elemento clickeado:", event.target);

    div_menu = document.getElementsByClassName("menu_pop_up")[0]
    console.log("div menu", div_menu, "creando menu", creando_menu)
    if (div_menu !== null && creando_menu === true && event.target != undefined) {
        console.log("div_menu presente");
        console.log(event.target);
        if (div_menu && !div_menu.contains(event.target)) {
            console.log("Clic fuera del menú, cerrando...");
            div_menu.remove();
            div_menu = null;
        } else {
            console.log("Clic dentro del menú");
        }
    }
});

//ordenarf por fecha cuando se inicia la pagina
array_notas.sort((a,b) => b[0] - a[0])
guardar_en_local(array_notas)
mostrar_de_array(array_notas)



boton_ordenar.addEventListener("click", function() {
    ordenar = (ordenar+1)%4
    ordenar_funcio(array_notas)
    
});
let boton_atras = document.getElementById("atras")

boton_atras.addEventListener("click", function(){
    mostrar_lista_de_llistas()
    let div_tareas = document.getElementById("tareas")
    div_tareas.style.display = "none"
    let div_llista = document.getElementById("llistas")
    div_llista.style.display = "block"
})
