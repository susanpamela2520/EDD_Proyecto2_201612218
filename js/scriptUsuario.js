//Pelicula Vista Usuario//

/*Arbol AVL - Peliculas*/

class NodoAVL {
    constructor(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q, paginas, categoria) {
        this.id_pelicula = id_pelicula;
        this.nombre_pelicula = nombre_pelicula;
        this.descripcion = descripcion;
        this.puntuacion_star = puntuacion_star;
        this.precio_Q = precio_Q;
        this.paginas = paginas;
        this.categoria = categoria

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

    constructor(raiz = null) {
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
            console.log("Valor:", nodo.id_pelicula + " " + nodo.nombre_pelicula);
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

    grafoAvl_() {
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

    preordenGrafo() {
        if (this.raiz == null) {
            console.log('No hay datos');
        } else {
            this.explorarArbol(this.raiz);
        }
    }

    //explorarArbol
    explorarArbol(node) {
        if (node != null) {
            if (node.izquierdo != null) {
                this.graphviz += node.id_pelicula + '[label="' + node.nombre_pelicula + '"];\n';
                this.graphviz += node.izquierdo.id_pelicula + '[label="' + node.izquierdo.nombre_pelicula + '"];\n';
                this.graphviz += node.id_pelicula + ' -> ' + node.izquierdo.id_pelicula + ';\n';
            }
            if (node.derecho != null) {
                this.graphviz += node.id_pelicula + '[label="' + node.nombre_pelicula + '"];\n';
                this.graphviz += node.derecho.id_pelicula + '[label="' + node.derecho.nombre_pelicula + '"];\n';
                this.graphviz += node.id_pelicula + ' -> ' + node.derecho.id_pelicula + '\n';
            }
            this.explorarArbol(node.izquierdo);
            this.explorarArbol(node.derecho);
        }
    }


    recorrePelicula(temporal) {
        var text = ""
        var PeliculaCont = document.getElementById("EspacioPelicula")
        // PeliculaCont.innerHTML = ""
        var PeliActual = temporal;
        if (PeliActual != null) {
            //var tempPeli = PeliActual.derecho;
            text += `
                <div class="col">
                  <div class="card">Pelicula
                    <img src="https://github.com/susanpamela2520/picture/blob/main/306337.png?raw=true" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${PeliActual.nombre_pelicula}</h5>
                    <p class="card-text">${PeliActual.descripcion}</p>
                    <p class="card-text">${PeliActual.precio_Q}</p>    </div>
                    <button type="button" class="btn btn-success" id="Alquiler" name="">Alquilar</button>
                    <button type="button" class="btn btn-success2" id="Informacion" name="">Informacion</button>
                  
                </div>
                </div>
                `

            text += this.recorrePelicula(PeliActual.izquierdo)
            text += this.recorrePelicula(PeliActual.derecho)
        }
        return text
    };

};



/*Mostrar Datos en el html*/
var data = JSON.parse(localStorage.getItem("ArbolPelis"));
var ArbolAVL = new AVL(data.raiz);
console.log(ArbolAVL)
var PeliculaCont = document.getElementById("EspacioPelicula")


PeliculaCont.innerHTML = `<div class="row row-cols-1 row-cols-md-4 g-5">
${ArbolAVL.recorrePelicula(ArbolAVL.raiz)} </div>
`

//------------------------------Lista de Ordenamientos--------------------------//

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

    mostrarListaSimpleOrden() {
        var text = ""
        var temporal = this.cabeza
        while (temporal != null) {
            text += `
            <div class="col">
              <div class="card">Pelicula
                <img src="https://github.com/susanpamela2520/picture/blob/main/306337.png?raw=true" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${temporal.nombre_pelicula}</h5>
                <p class="card-text">${temporal.descripcion}</p>
                <p class="card-text">${temporal.precio_Q}</p>    </div>
                <button type="button" class="btn btn-success" id="Alquiler" name="">Alquilar</button>
                <button type="button" class="btn btn-success2" id="Informacion" name="">Informacion</button>
              
            </div>
            </div>
            `
            temporal = temporal.next
        }
        return text
    }
   
};





//----------------------------------------------------------------------------------------------------------//
//-------------------- Actores --------------------------//


class NBinario {

    constructor(dni, nombre_actor, correo, descripcion) {
        this.left = null;
        this.right = null;
        this.dni = dni;
        this.nombre_actor = nombre_actor;
        this.correo = correo;
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
            this.correo = correo;
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
        grafica += "digraph G{\nlabel=\" ARBOL BINARIO DE ACTORES \";\nnode [shape=box];\n"
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
            grafica += this.dni + " " + this.nombre_actor; // label = dni + nombre_actor
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

    graficar() {
        var texto = "digraph grafica{\n"
        texto += "rankdir=TB;\n"
        texto += "node [shape = record];\n"
        texto += this.graficarInterno(this.root)
        texto += "}"
        console.log(texto)
    }

    graficarInterno(node) {
        if (node == null) return "";
        var text = ""

        text += this.graficarInterno(node.left);
        console.log(text)
        text += this.graficarInterno(node.right);
        console.log(text)
        var izquierdo = "";
        var derecho = "";
        if (node.left != null) {
            izquierdo = "<C0>|"
        }

        if (node.right != null) {
            derecho = "|<C1>"
        }


        console.log("izquierdo", izquierdo)
        console.log("derecho", derecho)
        text += "nodo" + node.dni + " [ label =\"" + izquierdo + node.dni + derecho + "\"];\n"
        if (node.left != null) {
            text += "nodo" + node.dni + ":C0 ->" + "nodo" + node.left.dni + "\n"
        }

        if (node.right != null) {
            text += "nodo" + node.dni + ":C1 ->" + "nodo" + node.right.dni + "\n"
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
    grafoAB_() {
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

    preordenGrafo() {
        if (this.root == null) {
            console.log('No hay datos');
        } else {
            this.explorarArbol(this.root);
        }
    }

    //explorarArbol
    explorarArbol(node) { //LABEL...
        if (node != null) {
            if (node.left != null) {
                this.graphviz += node.dni + '[label="' + node.dni + node.nombre_actor + '"];\n';
                this.graphviz += node.left.dni + '[label="' + node.left.dni + node.left.nombre_actor + '"];\n';
                this.graphviz += node.dni + ' -> ' + node.left.dni + ';\n';
            }
            if (node.right != null) {
                this.graphviz += node.dni + '[label="' + node.dni + node.nombre_actor + '"];\n';
                this.graphviz += node.right.dni + '[label="' + node.right.dni + node.right.nombre_actor + '"];\n';
                this.graphviz += node.dni + ' -> ' + node.right.dni + '\n';
            }
            this.explorarArbol(node.left);
            this.explorarArbol(node.right);
        }
    }

    recorreActoresPre(temporal) {
        var text = ""
        var PeliculaCont = document.getElementById("EspacioPelicula")
        // PeliculaCont.innerHTML = ""
        var ActorActual = temporal;
        if (ActorActual != null) {
            //var tempPeli = PeliActual.derecho;
            text += `
            <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${ActorActual.nombre_actor}</div>
            ${ActorActual.descripcion}
            </div>
             <span class="badge bg-primary rounded-pill"></span>
             </li>
            `
            text += this.recorreActoresPre(ActorActual.left)
            text += this.recorreActoresPre(ActorActual.right)
        }
        return text
    };


    recorreActoresPost(temporal) {
        var text = ""
        var PeliculaCont = document.getElementById("EspacioPelicula")
        // PeliculaCont.innerHTML = ""
        var ActorActual = temporal;
        if (ActorActual != null) {
            text += this.recorreActoresPost(ActorActual.left)
            text += this.recorreActoresPost(ActorActual.right)
            //var tempPeli = PeliActual.derecho;
            text += `
            <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${ActorActual.nombre_actor}</div>
            ${ActorActual.descripcion}
            </div>
             <span class="badge bg-primary rounded-pill"></span>
             </li>
            `
        }
        return text
    };



    recorreActoresIn(temporal) {
        var text = ""
        var PeliculaCont = document.getElementById("EspacioPelicula")
        // PeliculaCont.innerHTML = ""
        var ActorActual = temporal;
        if (ActorActual != null) {
            text += this.recorreActoresIn(ActorActual.left)
            
            //var tempPeli = PeliActual.derecho;
            text += `
            <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${ActorActual.nombre_actor}</div>
            ${ActorActual.descripcion}
            </div>
             <span class="badge bg-primary rounded-pill"></span>
             </li>
            `
            text += this.recorreActoresIn(ActorActual.right)
        }
        return text
    };






};


/*Llenado del div*/


//------Botones---//



/*Boton OrdenarAscendente Pelis*/
const btnAscendente = document.getElementById("btn-OrdenAscendente")
btnAscendente.addEventListener("click" , function(){
    var dataA = JSON.parse(localStorage.getItem("ListaPelisOrden"));  
    var ArbolPeliculas2A = new listaSimpleOrden(dataA.cabeza, dataA.size);
    ArbolPeliculas2A.ordenAscendente()

var PeliculaContA = document.getElementById("EspacioPelicula")
PeliculaContA.innerHTML = `<div class="row row-cols-1 row-cols-md-4 g-5">
${ArbolPeliculas2A.mostrarListaSimpleOrden()} </div>
`
   
});

/*Boton OrdenarDescendente Pelis*/
const btnDescendente = document.getElementById("btn-OrdenDescendente")
btnDescendente.addEventListener("click" , function(){
    var dataD = JSON.parse(localStorage.getItem("ListaPelisOrden"));   
    var ArbolPeliculas2D = new listaSimpleOrden(dataD.cabeza, dataD.size);
    ArbolPeliculas2D.ordenDescendente()
   
    var PeliculaCont = document.getElementById("EspacioPelicula")
    PeliculaCont.innerHTML = `<div class="row row-cols-1 row-cols-md-4 g-5">
    ${ArbolPeliculas2D.mostrarListaSimpleOrden()} </div>
    `
});


/*Ver Actores PreOrden*/

const btnVerActores = document.getElementById("btn-pre")
btnVerActores.addEventListener("click" , function(){
    var data = JSON.parse(localStorage.getItem("arbolActores"));   
    var ArbolActores= new BinarioArbol(data.root);
    var PeliculaCont = document.getElementById("EspacioPelicula")
PeliculaCont.innerHTML = `<ol class="list-group list-group-numbered" style="margin-left: 200px; margin-right:200px;">
${ArbolActores.recorreActoresPre(ArbolActores.root)} </ol>
`
});

/*Ver Actores PostOrden*/

const btnVerActoresPost = document.getElementById("btn-post")
btnVerActoresPost.addEventListener("click" , function(){
    var data = JSON.parse(localStorage.getItem("arbolActores"));   
    var ArbolActores= new BinarioArbol(data.root);
    var PeliculaCont = document.getElementById("EspacioPelicula")
PeliculaCont.innerHTML = `<ol class="list-group list-group-numbered" style="margin-left: 200px; margin-right:200px;">
${ArbolActores.recorreActoresPost(ArbolActores.root)} </ol>
`
});

/*Ver Actores InOrden*/

const btnVerActoresIn = document.getElementById("btn-in")
btnVerActoresIn.addEventListener("click" , function(){
    var data = JSON.parse(localStorage.getItem("arbolActores"));   
    var ArbolActores= new BinarioArbol(data.root);
    var PeliculaCont = document.getElementById("EspacioPelicula")
PeliculaCont.innerHTML = `<ol class="list-group list-group-numbered" style="margin-left: 200px; margin-right:200px;">
${ArbolActores.recorreActoresIn(ArbolActores.root)} </ol>
`
});