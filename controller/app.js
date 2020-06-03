var estadoSesion = false;
var datosUsuarioActivo = new Array();
var materiaSeleccionada = 0;
var materias = new Array();

$(function () {
  $("#VentanaModalIniciarSesion").show();
  $("#VentanaModalRegistrarse").hide();
  $(".tasks").hide();
  obtenerMaterias();
});
function obtenerMaterias() {
  var mate = new Array();
  var i = 0;
  db.collection("materias").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    mate[i] = 
      {
        nombre: doc.data().nombre,
        logo: doc.data().logo
        
      }
      i++;
  });
  console.log(mate)
  this.materias = mate;
  ConstruirMaterias();
  });
}
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBUC42YC28u9kTo2aBHLjjY4eU3JAq9Mco",
  authDomain: "tasks-c66e9.firebaseapp.com",
  databaseURL: "https://tasks-c66e9.firebaseio.com",
  projectId: "tasks-c66e9",
  storageBucket: "tasks-c66e9.appspot.com",
  messagingSenderId: "95682006064",
  appId: "1:95682006064:web:8711a307e594f7bbd271f5",
  measurementId: "G-SEVEJWCX9E"
});
var db = firebase.firestore();

/* actualizar */
function editar() {


  var datos_nuevos = db.collection("users").doc("6aPQDTkW1ZnXUf1dyY5s");

  return datos_nuevos.update({
    nombre: "ant",
    apellido: "pen",
    año: 1815
    })
  .then(function() {
      console.log("Document successfully updated!");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });


}
/* Inicio de Sesion y Registrarse */
function IniciarSesion() {
  datosInicioSesion = new Array();
  datosInicioSesion.push($("#txtUsuarioIniciarSecion").val());
  datosInicioSesion.push($("#txtPasswordIniciarSecion").val());
  if (ComprobarInputs (datosInicioSesion)) {
    LeerDatosBBD(datosInicioSesion);
  }else {
    swal({
      title: "Error",
      text: "Falta algun dato por insertar",
      icon: "warning",
      button: "Aceptar",
    });
  }
}
function SesionCorrecta() {
  if (estadoSesion) {
    swal({
      title: "Bienvenido: " + datosInicioSesion[0],
      text: "Datos insertados correctamente",
      icon: "success",
      button: "Aceptar",
    });
    $("#VentanaModalIniciarSesion").hide();
    $('#contenedorLogo__textUsuario').text("Bienvenido " + datosUsuarioActivo[1]);
  }else {
    swal({
      title: "Error",
      text: "Dataos erroneos, intente de nuevo",
      icon: "warning",
      button: "Aceptar",
    });
  }
}
function RegistrarUsuario() {
  let datosUsuario = new Array();
  datosUsuario.push($("#txtApellidoRegistro").val());
  datosUsuario.push($("#txtCorreoRegistro").val());
  datosUsuario.push($("#txtContraseñaRegistro").val());
  datosUsuario.push($("#txtNombreRegistro").val());
  if (ComprobarInputs(datosUsuario)){
    swal({
      title: "Bienvenido",
      text: "Datos insertados correctamente",
      icon: "success",
      button: "Aceptar",
    });
    InsertaDatosBBDD (datosUsuario);
  }else {
    swal({
      title: "Error",
      text: "Falta algun dato por insertar",
      icon: "warning",
      button: "Aceptar",
    });
  }
}
function ComprobarInputs(datos) {
  for (let i = 0; i < datos.length; i++) {
    if (datos[i] == "") {
      return false;
    }
  }
  return true;
}
/* ---- ---- Botones Ventana Modal ---- ---- */
function VentanaModalBotonCerrar() {
}
function VentanaRegistrarAbrir() {
  $("#VentanaModalIniciarSesion").hide();
  $("#VentanaModalRegistrarse").show();
}
function VentanaIniciarSesionAbrir() {
  $("#VentanaModalRegistrarse").hide();
  $("#VentanaModalIniciarSesion").show();
}
/* ---- ---- Matriz CRUD BBDD ---- ---- */
function InsertaDatosBBDD(datosUsuario) {
  db.collection("users").add({
    nombre: datosUsuario[3],
    apellido: datosUsuario[0],
    correo: datosUsuario[1],
    contraseña: datosUsuario[2]
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}
function LeerDatosBBD(datosUsuario) {
  db.collection("users").where("nombre", "==", datosUsuario[0]).where("contraseña", "==", datosUsuario[1])
  .get().then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {     
          this.datosUsuarioActivo = [datosUsuario[0], datosUsuario[1], doc.id];
          estadoSesion = true;
          SesionCorrecta();
    });
  });
  SesionCorrecta();
}
/* ---- ---- Constructores de Etiquetas ---- ---- */
function ConstruirMaterias() {
  let materiasCreadas = "";
  for (let i = 0; i< materias.length; i++) {
    materiasCreadas += (
          "<div class='tarjetas__contenedorTarjeta' onclick='MateriaSeleccionada("+i+")'>"+
            "<a href='#'' class='contenedorTrajeta__boton'>"+
              "<figure class='boton__tarjetaConEfecto'>"+
                "<div class='tarjetaConEfecto__frente'>"+
                  "<div class='frente__logoTrajeta'>"+
                    materias[i].logo +
                    "<h3 class='logoTarjeta__materia'>"+materias[i].nombre+"</h3>"+
                  "</div>"+
                "</div>"+
                "<figcaption class='tarjetaConEfecto__atras'>"+
                  "<h2 class='atras__titulo'>"+
                    "Descripsion de la materia"+
                  "</h2>"+
                  "<p class='atrar__parrafo'>"+
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit."+
                    "Itaque illum quisquam tempora, nesciunt praesentium nihil odio"+
                    "nisi quos facilis quo?"+
                  "</p>"+
                "</figcaption>"+
              "</figure>"+
            "</a>"+
          "</div>"
    );
  }
  $('.tarjetas').html(materiasCreadas);
}
/* ---- ---- Acciones Materias ---- ---- */
function MateriaSeleccionada(PosicionMateria) {
  console.log(materias[materiaSeleccionada].nombre)
  materiaSeleccionada = PosicionMateria;
  $(".tarjetas").hide();
  $(".tasks").show();
  obtenerTareas();
}
function insertarTarea() {
  let datosTareas = new Array();
  datosTareas.push($("#tituloTarea").val());
  datosTareas.push($("#descripsionTarea").val());
  datosTareas.push($("#nivelPrioridad").val());
  if (ComprobarInputs(datosTareas)) {
    db.collection("Tareas").add({
      titulo: datosTareas[0],
      descripsion: datosTareas[1],
      prioridad: datosTareas[2],
      materia: materias[materiaSeleccionada].nombre
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    obtenerTareas();
  }else {
    swal({
      title: "Error",
      text: "Falta algun dato por insertar",
      icon: "warning",
      button: "Aceptar",
    });
  }
}
function obtenerTareas() {
  let tareas = new Array()
  var i = 0;
  db.collection("Tareas").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().materia == materias[materiaSeleccionada].nombre) {
        tareas[i] = {
          titulo: doc.data().titulo,
          prioridad: doc.data().prioridad,
          descripsion: doc.data().descripsion,
          id: doc.id+""
        };
        i++;
      }
    });
  ConstruirTareas(tareas);
  });
}
$(document).on('click', '.footerTasks__boton', function() {
  let idTareaPresionada = $(this).val();
  console.log(idTareaPresionada);
  db.collection("Tareas").doc(idTareaPresionada).delete().then(function() {
    swal({
      title: "Conseguido",
      text: "Se a logrado eliminar la tarea",
      icon: "success",
      button: "Aceptar",
    });
    obtenerTareas();
  }).catch(function(error) {
    swal({
      title: "Error",
      text: "No se pudo eliminar la tarea: " + error,
      icon: "warning",
      button: "Aceptar",
    });
  });
});
function ConstruirTareas(tareas) {
  console.log(tareas);
  let tareasCreadas = "";
  for (let i = 0; i< tareas.length; i++) {
    tareasCreadas += (
        "<div class='tareasContenedor__tarea'>"+
          "<div class='tarea__header'>"+
            "<h1 class='headerTasks__titulo'>"+tareas[i].titulo+"</h1>"+
            "<div class='headerTasks__NivelPrioridad'>"+tareas[i].prioridad+"</div>"+
            "</div>"+
          "<div class='tarea__body'>"+
            "<p class='bodyTasks__descripsion'>"+tareas[i].descripsion+"</p>"+
          "</div>"+
          "<div class='tarea__footer'>"+
            "<button class='footerTasks__boton' value="+tareas[i].id+">Delete</button>"+
            "<buttton class='footerTasks__boton tasksEditar'>Editar</buttton>"+
          "</div>"+
        "</div>"
    );
  }
  $('.tareasContenedor').html(tareasCreadas);
}