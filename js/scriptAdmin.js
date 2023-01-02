/* ================================================================================================= */
/* ==== PELICULAS ================================================================================== */
/Carga Masiva consts/
const dropArea = document.querySelector("#drop-areaPeliculas");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-Peliculas");

/Carga Masiva Peliculas/
button.addEventListener("click", (e)=>{
    input.click();
});

input.addEventListener("change", ()=>{
    processFile(input.files[0]);
});

function processFile(file){
        const fileReader = new FileReader();
        
        fileReader.addEventListener('load', e =>{            
          //  if(!localStorage.getItem("ArbolPelis")){
                const fileUrl = fileReader.result;
                const archivo = JSON.parse(fileUrl);
                alert("leido")
                console.log(archivo)

                //Arbol1 //

                var ArbolPeliculasFinal = JSON.parse(localStorage.getItem("ArbolPelis")); //error
                var ArbolPeliculas2 = new AVL(ArbolPeliculasFinal.raiz); 
                
                var ListaPeliculasFinal = JSON.parse(localStorage.getItem("ListaPelisOrden"));
                var ListaPeliculas = new listaSimpleOrden(ListaPeliculasFinal.cabeza, ListaPeliculasFinal.size)
            
                archivo.forEach(element => {                    
                    ArbolPeliculas2.insertar(element.id_pelicula, element.nombre_pelicula, element.descripcion, element.puntuacion_star, element.precion_Q, element.paginas, element.categoria);
                    ListaPeliculas.agregarDataOrden(element.id_pelicula, element.nombre_pelicula, element.descripcion, element.puntuacion_star, element.precion_Q, element.paginas, element.categoria);
                    
                    //console.log("insertando id "+element.id_pelicula);
                });

                //Arbol1
             
                localStorage.setItem("ArbolPelis", JSON.stringify(ArbolPeliculas2));
                localStorage.setItem("ListaPelisOrden",JSON.stringify(ListaPeliculas));
              
           // }
        });   
        fileReader.readAsText(file);
};

/*Arbol AVL - Peliculas*/

class NodoAVL{
    constructor(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q, paginas, categoria){
        this.id_pelicula = id_pelicula;
        this.nombre_pelicula = nombre_pelicula;
        this.descripcion = descripcion;
        this.puntuacion_star = puntuacion_star;
        this.precio_Q = precio_Q;
        this.paginas = paginas;
        this.categoria = categoria
        this.comentario = []

        this.izquierdo = null;
        this.derecho = null;
        this.altura = 0;
    }
}

class AVL {
    //constructor() {
    //    this.raiz = null;
    //    this.graphviz = ""
    //}

    constructor(raiz = null){
        this.raiz = raiz;
        this.graphviz = ""
    }

    MAXIMO(valor1, valor2) {
        if (valor1 > valor2) return valor1;
        return valor2;
    }

    altura(nodo) {
        if (nodo == null) return -1;
        return nodo.altura;
    }

    insertar(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q, paginas, categoria) {
        this.raiz = this.add(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q, paginas, categoria, this.raiz);
    }
    
    
    add(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q, paginas, categoria, nodo) {
        if (nodo == null) return new NodoAVL(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q, paginas, categoria);
        else {
            if (id_pelicula < nodo.id_pelicula) {
                nodo.izquierdo = this.add(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q, paginas, categoria, nodo.izquierdo)
                if (this.altura(nodo.derecho) - this.altura(nodo.izquierdo) == -2) {
                    if (id_pelicula < nodo.izquierdo.id_pelicula) {
                        nodo = this.RotacionIzquierda(nodo);
                    } else {
                        nodo = this.RotacionDobleIzquierda(nodo);
                    }
                }
            } else if (id_pelicula > nodo.id_pelicula) {
                nodo.derecho = this.add(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q, paginas, categoria, nodo.derecho);
                if (this.altura(nodo.derecho) - this.altura(nodo.izquierdo) == 2) {
                    if (id_pelicula > nodo.derecho.id_pelicula) {
                        nodo = this.RotacionDerecha(nodo);
                    } else {
                        nodo = this.RotacionDobleDerecha(nodo);
                    }
                }
            } else {
                nodo.id_pelicula = id_pelicula;
                //agregar otros atributos.
            }
        }
        nodo.altura = this.MAXIMO(this.altura(nodo.izquierdo), this.altura(nodo.derecho)) + 1
        return nodo;
    }

    RotacionIzquierda(nodo) {
        let aux = nodo.izquierdo;
        nodo.izquierdo = aux.derecho;
        aux.derecho = nodo;
        nodo.altura = this.MAXIMO(this.altura(nodo.derecho), this.altura(nodo.izquierdo)) + 1;
        aux.altura = this.MAXIMO(this.altura(nodo.izquierdo), nodo.altura) + 1;
        return aux;
    }

    RotacionDobleIzquierda(nodo) {
        nodo.izquierdo = this.RotacionDerecha(nodo.izquierdo);
        return this.RotacionIzquierda(nodo);
    }

    RotacionDerecha(nodo) {
        var aux = nodo.derecho;
        nodo.derecho = aux.izquierdo;
        aux.izquierdo = nodo;
        nodo.altura = this.MAXIMO(this.altura(nodo.derecho), this.altura(nodo.izquierdo)) + 1;
        aux.altura = this.MAXIMO(this.altura(nodo.derecho), nodo.altura) + 1;
        return aux;
    }

    RotacionDobleDerecha(nodo) {
        nodo.derecho = this.RotacionIzquierda(nodo.derecho);
        return this.RotacionDerecha(nodo);
    }


    preOrden() {
        this.pre_orden(this.raiz);
    }

    pre_orden(nodo) {
        if (nodo != null) {
            console.log("Valor:", nodo.id_pelicula + " "+nodo.nombre_pelicula);
            this.pre_orden(nodo.izquierdo);
            this.pre_orden(nodo.derecho);
        }
    }

    inOrden() {
        this.in_orden(this.raiz);
    }

    in_orden(nodo) {
        if (nodo != null) {
            this.in_orden(nodo.izquierdo);
            console.log("Valor:", nodo.valor);
            this.in_orden(nodo.derecho);
        }
    }

    postOrden() {
        this.post_orden(this.raiz);
    }

    post_orden(nodo) {
        if (nodo != null) {
            this.post_orden(nodo.izquierdo);
            this.post_orden(nodo.derecho);
            console.log("Valor:", nodo.valor);
        }
    }

    grafoAvl_(){
        this.graphviz = '';
        this.graphviz = 'digraph AVL{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#b5bcfc";\nranksep = 0.8;\nnodesep = 0.8;\nsubgraph cluster_A{\nlabel = "";\nbgcolor = "white";\nfontcolor = black;\nfontsize = 30;\n\n ';
        this.preordenGrafo();
        this.graphviz += '}\n}';
        var picture = document.getElementById("contenedor2")
            picture.innerHTML = ""
            picture.innerHTML = "<div id=\"grafica\"></div>"        
        console.log(this.graphviz)
        d3.select("#grafica").graphviz()
            .width(2000)
            .height(1500)
            .zoom(true)
            .fit(true)
            .renderDot(this.graphviz)
    }

    preordenGrafo(){
        if(this.raiz == null){
            console.log('No hay datos');
        }else{
            this.explorarArbol(this.raiz);
        }
    }

    //explorarArbol
    explorarArbol(node){
        if(node != null){
            if(node.izquierdo != null){
                this.graphviz += node.id_pelicula + '[label="' + node.nombre_pelicula+ '"];\n';
                this.graphviz += node.izquierdo.id_pelicula + '[label="' + node.izquierdo.nombre_pelicula+ '"];\n';
                this.graphviz += node.id_pelicula+ ' -> ' + node.izquierdo.id_pelicula+ ';\n';
            }
            if(node.derecho!= null){                
                this.graphviz += node.id_pelicula + '[label="' + node.nombre_pelicula + '"];\n';
                this.graphviz += node.derecho.id_pelicula + '[label="' + node.derecho.nombre_pelicula + '"];\n';
                this.graphviz += node.id_pelicula + ' -> ' + node.derecho.id_pelicula + '\n';
            }
            this.explorarArbol(node.izquierdo);
            this.explorarArbol(node.derecho);
        }
    }

}

/*Boton para graficar Pelis*/
const btnGrafica1 = document.getElementById("btn-GraficaPelis")
btnGrafica1.addEventListener("click" , function(){
    var data = JSON.parse(localStorage.getItem("ArbolPelis"));   
    console.log(data);
    var ArbolAVL = new AVL(data.raiz); 
    console.log("grafica"); 
    ArbolAVL.grafoAvl_();

});


/* LISTA PARA ORDEN DE PELICULAS*/

class NodeListOrden{  

    constructor(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q, paginas, categoria){
        this.id_pelicula = id_pelicula;
        this.nombre_pelicula = nombre_pelicula;
        this.descripcion = descripcion;
        this.puntuacion_star = puntuacion_star;
        this.precio_Q = precio_Q;
        this.paginas = paginas;
        this.categoria = categoria;
        this.next = null;

    }
};

//Lista Simple
class listaSimpleOrden {//clase lista, donde se crea la lista simple
 
    constructor(cabeza = null, size=0){
        this.cabeza = cabeza;
        this.size = size;
    }


    //Se agregan los datos a la lista
    
    agregarDataOrden(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q, paginas, categoria){
        const NuevoNodo = new NodeListOrden(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q, paginas, categoria);
        if(!this.cabeza){
            this.cabeza = NuevoNodo
        }else{
            let actual = this.cabeza;
            while(actual.next){//Mientras haya referencia al siguiente nodo
                if(actual.nombre_pelicula == nombre_pelicula){
                    return 
                }                
                actual = actual.next; //El actual sera igual al siguiente 
            };
            actual.next = NuevoNodo;
        };
        this.size++;
    };

    ordenAscendente(){
            var  actual = this.cabeza
            while (actual.next != null) {
                var temporal = actual.next
            while (temporal != null) {
                if (actual.nombre_pelicula > temporal.nombre_pelicula) {
                    
                    var id = actual.id_pelicula
                    var name = actual.nombre_pelicula
                    var descripcion = actual.descripcion
                    var pts = actual.puntuacion_star
                    var precio = actual.precio_Q
                    var pag = actual.paginas
                    var cat = actual.categoria

                    actual.id_pelicula = temporal.id_pelicula
                    actual.nombre_pelicula =  temporal.nombre_pelicula
                    actual.descripcion = temporal.descripcion
                    actual.puntuacion_star = temporal.puntuacion_star
                    actual.precio_Q = temporal.precio_Q
                    actual.paginas = temporal.paginas
                    actual.categoria = temporal.categoria


                    temporal.id_pelicula = id
                    temporal.nombre_pelicula = name
                    temporal.descripcion = descripcion
                    temporal.puntuacion_star = pts
                    temporal.precio_Q = precio
                    temporal.paginas = pag
                    temporal.categoria = cat
                }
                temporal = temporal.next

            }
                actual = actual.next
                
            }

    }

    ordenDescendente(){

        var  actual = this.cabeza
        while (actual.next != null) {
            var temporal = actual.next
        while (temporal != null) {
            if (actual.nombre_pelicula < temporal.nombre_pelicula) {
                
                var id = actual.id_pelicula
                var name = actual.nombre_pelicula
                var descripcion = actual.descripcion
                var pts = actual.puntuacion_star
                var precio = actual.precio_Q
                var pag = actual.paginas
                var cat = actual.categoria

                actual.id_pelicula = temporal.id_pelicula
                actual.nombre_pelicula =  temporal.nombre_pelicula
                actual.descripcion = temporal.descripcion
                actual.puntuacion_star = temporal.puntuacion_star
                actual.precio_Q = temporal.precio_Q
                actual.paginas = temporal.paginas
                actual.categoria = temporal.categoria


                temporal.id_pelicula = id
                temporal.nombre_pelicula = name
                temporal.descripcion = descripcion
                temporal.puntuacion_star = pts
                temporal.precio_Q = precio
                temporal.paginas = pag
                temporal.categoria = cat
            }
            temporal = temporal.next

        }
            actual = actual.next
            
        }


    }
   
};






/* ================================================================================================= */
/* ==== CLIENTES =================================================================================== */
/Carga Masiva consts/
const dropAreaClient = document.querySelector("#drop-areaClientes");
const buttonClient = dropAreaClient.querySelector("button");
const inputClient = dropAreaClient.querySelector("#input-Clientes");

/Carga Masiva Clientes/
buttonClient.addEventListener("click", (e)=>{
    inputClient.click();
});

inputClient.addEventListener("change", ()=>{
    processFileClient(inputClient.files[0]);
});

function processFileClient(file){       
        const fileReader = new FileReader();
        
        fileReader.addEventListener('load', e =>{
        const fileUrl = fileReader.result;
	    const archivo = JSON.parse(fileUrl);
	    alert("leido");
        console.log(archivo);
	    
        var ListaClientesFinal = JSON.parse(localStorage.getItem("listaSimpleUsuarios"));  //JSON.parse(localStorage.getItem("ListaClientes"));
        var ListaClientes2 = new listaSimpleT(ListaClientesFinal.cabeza, ListaClientesFinal.size); /*cambiar*/
        archivo.forEach(element => {
            ListaClientes2.agregarData(element.dpi, element.nombre_completo, element.nombre_usuario, element.correo, element.contrasenia, element.telefono, element.admin);
        });
        console.log(ListaClientes2.tamanio());
        //localStorage.setItem("ListaClientes", JSON.stringify(ListaClientes2));
        localStorage.setItem("listaSimpleUsuarios", JSON.stringify(ListaClientes2));
        });
                
        fileReader.readAsText(file);
};

/*Lista Simple -- Clientes*/
class NodeList{  

    constructor(dpi, nombre_completo, nombre_usuario, correo, contrasenia, telefono, admin){
        this.dpi = dpi;
        this.nombre_completo = nombre_completo;
        this.nombre_usuario = nombre_usuario;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.telefono = telefono;
        this.admin = admin;
        this.next = null;

    }
};

//Lista Simple
class listaSimpleT {//clase lista, donde se crea la lista simple
 
    constructor(cabeza = null, size=0){
        this.cabeza = cabeza;
        this.size = size;
    }


    //Se agregan los datos a la lista
    
    agregarData(dpi, nombre_completo, nombre_usuario, correo, contrasenia, telefono, admin){
        const NuevoNodo = new NodeList(dpi, nombre_completo, nombre_usuario, correo, contrasenia, telefono, admin);
        if(!this.cabeza){
            this.cabeza = NuevoNodo
        }else{
            let actual = this.cabeza;
            while(actual.next){//Mientras haya referencia al siguiente nodo
                if(actual.nombre_usuario == nombre_usuario){
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

    grafo_(){
        var codigodot = "digraph G{\nlabel=\" \";\nnode [shape=box];\n";
        var temporal = this.cabeza;
        var conex = "";
        var nodos = "";
        var sizegraph = 0;
        while(temporal != null){
            nodos += "N" + sizegraph + "[label=\"" + temporal.nombre_usuario + "\" ];\n"
            if(temporal.next != null){
                var auxnum = sizegraph+1;
                conex += "N" + sizegraph + " -> N" +  auxnum + ";\n";
            }
            temporal = temporal.next;
            sizegraph ++;
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos + "\n"
        codigodot += "//agregado conexiones o flechas\n"
        codigodot += "{\n" + conex + "\n}\n}"
        //console.log(codigodot);
        //document.write(codigodot)
        this.generarImagen(codigodot);
    }

    generarImagen(codigodot){
        //console.log(codigodot)
        var picture = document.getElementById("contenedor2")
        picture.innerHTML = ""
        picture.innerHTML = "<div id=\"grafica\"></div>"
        d3.select("#grafica").graphviz()
            .width(900)
            .height(500)
            .fit(true)
            .renderDot(codigodot)
            
    }

    mostrarListaSimple() {
        var temporal = this.cabeza
        while (temporal != null) {
            console.log(temporal.nombre_usuario)
            temporal = temporal.next
        }
    }

    tamanio(){
        return this.size;
    }
};

/*Boton para graficar Clientes*/
const btnCliente = document.getElementById("btn-GraficaClient")
btnCliente.addEventListener("click" , function(){
    var listaClientFinal = JSON.parse(localStorage.getItem("listaSimpleUsuarios")); 
    var listaClient2 = new listaSimpleT(listaClientFinal.cabeza, listaClientFinal.size);
    console.log(listaClient2.tamanio());
    listaClient2.grafo_();    
});


/* ================================================================================================= */
/* =========ACTORES======================================================================================== */

/Carga Masiva Actores/
const dropAreaActores = document.querySelector("#drop-areaActores");
const buttonActores = dropAreaActores.querySelector("button")
const inputActores = dropAreaActores.querySelector("#input-Actores");

/Carga Masiva  Actores/
buttonActores.addEventListener("click", (e)=>{
    inputActores.click();
});

inputActores.addEventListener("change", ()=>{
    processFileActores(inputActores.files[0]);
});

var ArbolB;
function processFileActores(file){
    const fileReader = new FileReader();        
    fileReader.addEventListener('load', e =>{
        if(!localStorage.getItem("arbolActores")){ // quitar para volver a cargar archivos json. 
            const fileUrl = fileReader.result;
            const archivo = JSON.parse(fileUrl);
            alert("leido")
            console.log(archivo)
            var arbolActoresFinal = JSON.parse(localStorage.getItem("arbolActores"));
            var arbolActoresFinal2 = new BinarioArbol(); //ArbolB();
            
            archivo.forEach(element => {
                arbolActoresFinal2.insertB(element.dni, element.nombre_actor, element.correo, element.descripcion);
            });
            console.log("AGREGADO..");
            //ArbolB = arbolActoresFinal2; //test_funcional
            localStorage.setItem("arbolActores", JSON.stringify(arbolActoresFinal2));
        }
    });                
    fileReader.readAsText(file);
};

/Arbol Binario  Actores/
// Arbol Binario 
class NBinario {

    constructor(dni, nombre_actor, correo, descripcion) {
      this.left = null;
      this.right = null;
      this.dni = dni;
      this.nombre_actor = nombre_actor;
      this.correo =  correo;
      this.descripcion = descripcion;
    }
  
    insertB(dni, nombre_actor, correo, descripcion) {
      //console.log(dni);
      if (dni < this.dni) {
        if (this.left == null) this.left = new NBinario(dni, nombre_actor, correo, descripcion);
        else this.left.insertB(dni, nombre_actor, correo, descripcion);
      } else if (dni > this.dni) {
        if (this.right == null) this.right = new NBinario(dni, nombre_actor, correo, descripcion);
        else this.right.insertB(dni, nombre_actor, correo, descripcion);
      } else {
        this.dni = dni;
        this.nombre_actor = nombre_actor;
        this.correo =  correo;
        this.descripcion = descripcion;
      }
    }
  
    search(dni) {
      if (this.dni === dni) {
        return this.dni;
      } else {
        if (dni < this.dni) {
          if (this.left === null) return null;
          else return this.left.search(dni);
        } else if (dni > this.dni) {
          if (this.right === null) return null;
          else return this.right.search(dni);
        }
      }
      return null;
    }
  
    configraph_() {
      console.log("x2_22");
      let grafica = "";
      grafica +="digraph G{\nlabel=\" ARBOL BINARIO DE ACTORES \";\nnode [shape=box];\n"
      grafica += this.explore();
      grafica += "}\n";
      console.log(grafica);
      return grafica;
    }
  
    explore() {
      let grafica = "";
      if (this.left == null || this.right == null) {
        grafica += "node";
        grafica += this.dni;
        grafica += '[ label="';
        grafica += this.dni + " "+ this.nombre_actor; // label = dni + nombre_actor
        grafica += '"];\n';
      } else {
        grafica += "node";
        grafica += this.dni;
        grafica += ' [ label ="';
        grafica += this.dni;
        grafica += '"];\n';
      }
  
      if (this.left != null) {
        grafica += this.left.explore();
        grafica += "node";
        grafica += this.dni;
        grafica += "->node";
        grafica += this.left.dni;
        grafica += ";\n";
      }
  
      if (this.right != null) {
        grafica += this.right.explore();
        grafica += "node";
        grafica += this.dni;
        grafica += "->node";
        grafica += this.right.dni;
        grafica += ";\n";
      }
  
      return grafica;
    }
};

class BinarioArbol {
  
    constructor(root = null) {
        this.root = root;
        this.graphviz = '';
    }

    graficar(){
      var texto = "digraph grafica{\n"
      texto +="rankdir=TB;\n"
      texto +="node [shape = record];\n"
      texto += this.graficarInterno(this.root)
      texto += "}"
      console.log(texto)
    }
  
    graficarInterno(node) {
      if (node == null) return "";
      var  text = ""
  
      text += this.graficarInterno(node.left);
      console.log(text)
      text += this.graficarInterno(node.right);
      console.log(text)
      var izquierdo = "";
      var derecho = "";
      if(node.left != null){
        izquierdo ="<C0>|"
      }
  
      if(node.right != null){
        derecho ="|<C1>"
      }
  
  
      console.log("izquierdo",izquierdo)
      console.log("derecho",derecho)
      text +=  "nodo"+node.dni+" [ label =\""+izquierdo  +node.dni+derecho  +"\"];\n"
      if(node.left != null){
        text+= "nodo"+node.dni+":C0 ->"+"nodo"+node.left.dni+"\n"
      }
  
      if(node.right != null){
        text+= "nodo"+node.dni+":C1 ->"+"nodo"+node.right.dni+"\n"
      }
      
      return text
    } 
  
    render() {
        var picture = document.getElementById("contenedor2")
            picture.innerHTML = ""
            picture.innerHTML = "<div id=\"grafica\"></div>"        
        //console.log(this.configraph())   
      
        d3.select("#grafica").graphviz()
            .width(2000)
            .height(1500)
            .zoom(true)
            .fit(true)
            .renderDot(this.configraph())
    }
  
    render_() {
        var picture = document.getElementById("contenedor2")
            picture.innerHTML = ""
            picture.innerHTML = "<div id=\"grafica\"></div>"        
        //console.log(this.configraph())   
      
        d3.select("#grafica").graphviz()
            .width(2000)
            .height(1500)
            .zoom(true)
            .fit(true)
            .renderDot(this.graficar())
    }


    configraph() {
        console.log("x1_x");
      return this.root.configraph_();
    }
  
    insertB(dni, nombre_actor, correo, descripcion) {
      if (this.root === null) this.root = new NBinario(dni, nombre_actor, correo, descripcion);
      else this.root.insertB(dni, nombre_actor, correo, descripcion);
    }
  
    search(nombre_actor) {
      return this.root.search(nombre_actor);
    }
  
    ordePre() {
      this.ordePreInternal(this.root);
    }
  
    ordePreInternal(node) {
      if (node == null) return;
  
      this.ordePreInternal(node.left);
      this.ordePreInternal(node.right);
    }
  
    inorden() {
      this.inordenInternal(this.root);
    }
  
    inordenInternal(node) {
      if (node == null) return;
  
      this.inordenInternal(node.left);
      console.log(node);
      this.inordenInternal(node.right);
    }
  
    ordenPost() {
      this.ordenPostInternal(this.root);
    }
  
    ordenPostInternal(node) {
      if (node == null) return;
  
      this.ordenPostInternal(node.left);
      this.ordenPostInternal(node.right);
      console.log(node.dni)
    } 
    //------------------------------------------------------
    grafoAB_(){
        this.graphviz = '';
        this.graphviz = 'digraph AB{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#b5bcfc";\nranksep = 0.8;\nnodesep = 0.8;\nsubgraph cluster_A{\nlabel = "";\nbgcolor = "white";\nfontcolor = black;\nfontsize = 30;\n\n ';
        this.preordenGrafo();
        this.graphviz += '}\n}';
        var picture = document.getElementById("contenedor2")
            picture.innerHTML = ""
            picture.innerHTML = "<div id=\"grafica\"></div>"        
        console.log(this.graphviz)
        d3.select("#grafica").graphviz()
            .width(2000)
            .height(1500)
            .zoom(true)
            .fit(true)
            .renderDot(this.graphviz)
    }

    preordenGrafo(){
        if(this.root == null){
            console.log('No hay datos');
        }else{
            this.explorarArbol(this.root);
        }
    }

    //explorarArbol
    explorarArbol(node){ //LABEL...
        if(node != null){
            if(node.left != null){
                this.graphviz += node.dni + '[label="' + node.dni+node.nombre_actor+ '"];\n';
                this.graphviz += node.left.dni + '[label="' + node.left.dni+node.left.nombre_actor+ '"];\n';
                this.graphviz += node.dni+ ' -> ' + node.left.dni+ ';\n';
            }
            if(node.right!= null){                
                this.graphviz += node.dni + '[label="' + node.dni+node.nombre_actor + '"];\n';
                this.graphviz += node.right.dni + '[label="' + node.right.dni+node.right.nombre_actor + '"];\n';
                this.graphviz += node.dni + ' -> ' + node.right.dni + '\n';
            }
            this.explorarArbol(node.left);
            this.explorarArbol(node.right);
        }
    }
};

 //Boton de grafica Podcast
const btnActores = document.getElementById("btn-GrafActores")
btnActores.addEventListener("click" , function(){
    var data = JSON.parse(localStorage.getItem("arbolActores"));   
    console.log(data);
    var ArbolB = new BinarioArbol(data.root); 
    console.log("vistas_grafica");
    ArbolB.grafoAB_();
    //ArbolB.render();
});



    
/* ================================================================================================= */
/* =========CATEGORIAS======================================================================================== */






//VERIFICACIONES DE CREACION DE ESTRUCTURAS//

//Arbol 1//

if (localStorage.getItem("ArbolPelis") == null) {
    var arbolPelis = new AVL();
    localStorage.setItem("ArbolPelis", JSON.stringify(arbolPelis));
} else {
    console.log(JSON.parse(localStorage.getItem("ArbolPelis")));
};


//Lista Orden Peliculas//

if (localStorage.getItem("ListaPelisOrden") == null) {
    var ListPelis = new listaSimpleOrden();
    localStorage.setItem("ListaPelisOrden", JSON.stringify(ListPelis));
} else {
    console.log(JSON.parse(localStorage.getItem("ListaPelisOrden")));
};
