//localStorage.clear();

//Login
class NodeList{  /*clase para mi Lista Simple de Usuarios*/

    constructor(dpi, nombre_completo, nombre_usuario, correo, contrasenia, telefono, admin){
        this.dpi = dpi;
        this.nombre_completo = nombre_completo
        this.nombre_usuario = nombre_usuario;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.telefono = telefono;
        this.admin = admin;
        this.next = null;

    }
};

class listaSimple {//clase lista, donde se crea la lista simple
  
     constructor(cabeza = null, size=0){
         this.cabeza = cabeza;
         this.size = size;
     }

     //Se agregan los datos a la lista
     
     agregarData(dpi, nombreCompleto, nombreUsuario, correo, contrasenia, telefono, admin){
         const NuevoNodo = new NodeList(dpi, nombreCompleto, nombreUsuario, correo, contrasenia, telefono, admin);
         if(!this.cabeza){
             this.cabeza = NuevoNodo
         }else{
             let actual = this.cabeza;
             while(actual.next){//Mientras haya referencia al siguiente nodo
                 if(actual.usuario == usuario){
                     return 
                 }                
                 actual = actual.next; //El actual sera igual al siguiente 
             };
             actual.next = NuevoNodo;
         };
         this.size++;
     };
 
 
     buscarData(nombreUsuario, contrasenia){
              let actual = this.cabeza;
              while(actual != null){
                 if(actual.nombre_usuario == nombreUsuario && actual.contrasenia == contrasenia ){//se encuentra por medio de la busqueda de contra y usuario
                     return actual;
                 };
                 actual = actual.next;
             };
             return null;
         
     };
 
};
 
if(!localStorage.getItem("listaSimpleUsuarios")){
    var listaUsuarios = new listaSimple();
    listaUsuarios.agregarData("2354168452525", "Oscar Armin", "EDD", "", "12345678" ,"12345678", true);
    localStorage.setItem("listaSimpleUsuarios", JSON.stringify(listaUsuarios)); /*listaSimpleUsuarios, variable donde se guarda info de lista de Usuarios*/    
} else{
    console.log(JSON.parse(localStorage.getItem("listaSimpleUsuarios")));    
};
 
 //Accion de boton para administrador //tira error//
const formLogin = document.getElementById("login-form")
formLogin.addEventListener("submit" , function(event){
    const UserBox = document.getElementById("Reg-Usuario")
    const PassBox = document.getElementById("Reg-Contraseña")
    var usuario = UserBox.value
    var pass = PassBox.value

    var listaUsuariosFinal = JSON.parse(localStorage.getItem("listaSimpleUsuarios"));
    var listaUsuarios2 = new listaSimple(listaUsuariosFinal.cabeza, listaUsuariosFinal.size);
    var usuariolog = listaUsuarios2.buscarData(usuario, pass);
    localStorage.setItem("UsuarioActivo", JSON.stringify(usuariolog));
    
    if(usuariolog != null){   
        if(usuariolog.admin){            
            alert("Entro a Admin")
            window.location.href = "Admin.html";
        }else{           
            alert("Entro a usuario")
            window.location.href = "Usuario.html";
        }
    }else{
        alert("Usuario de Administrado Incorrecto")        
    }
    event.preventDefault();
});



