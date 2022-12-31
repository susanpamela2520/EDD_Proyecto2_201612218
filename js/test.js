
class NBinario {

  constructor(obj) {
    this.left = null;
    this.right = null;
    this.obj = obj;
  }

  insertB(obj) {
    console.log(obj);
    if (obj < this.obj) {
      if (this.left == null) this.left = new NBinario(obj);
      else this.left.insertB(obj);
    } else if (obj > this.obj) {
      if (this.right == null) this.right = new NBinario(obj);
      else this.right.insertB(obj);
    } else {
      this.obj = obj;
    }
  }

  search(dni) {
    if (this.obj === dni) {
      return this.obj;
    } else {
      if (dni < this.obj) {
        if (this.left === null) return null;
        else return this.left.search(dni);
      } else if (dni > this.obj) {
        if (this.right === null) return null;
        else return this.right.search(dni);
      }
    }
    return null;
  }

  configraph() {
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
      grafica += this.obj;
      grafica += '[ label="';
      grafica += this.obj;
      grafica += '"];\n';
    } else {
      grafica += "node";
      grafica += this.obj;
      grafica += ' [ label ="';
      grafica += this.obj;
      grafica += '"];\n';
    }

    if (this.left != null) {
      grafica += this.left.explore();
      grafica += "node";
      grafica += this.obj;
      grafica += "->node";
      grafica += this.left.obj;
      grafica += ";\n";
    }

    if (this.right != null) {
      grafica += this.right.explore();
      grafica += "node";
      grafica += this.obj;
      grafica += "->node";
      grafica += this.right.obj;
      grafica += ";\n";
    }

    return grafica;
  }
}
  
class BinarioArbol {
  constructor() {
    this.root = null;
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
    text +=  "nodo"+node.obj+" [ label =\""+izquierdo  +node.obj+derecho  +"\"];\n"
    if(node.left != null){
      text+= "nodo"+node.obj+":C0 ->"+"nodo"+node.left.obj+"\n"
    }

    if(node.right != null){
      text+= "nodo"+node.obj+":C1 ->"+"nodo"+node.right.obj+"\n"
    }
    
    return text
  } 

  render() {
      var picture = document.getElementById("contenedor2")
          picture.innerHTML = ""
          picture.innerHTML = "<div id=\"grafica\"></div>"        
      console.log(this.configraph())   
    
    d3.select("#grafica").graphviz()
          .width(2000)
          .height(1500)
          .zoom(true)
          .fit(true)
          .renderDot(this.configraph())
  }

  configraph() {
    return this.root.configraph();
  }

  insertB(obj) {
    if (this.root === null) this.root = new NBinario(obj);
    else this.root.insertB(obj);
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
    console.log(node.obj)
  } 
}
  
  const arbol = new BinarioArbol();
  arbol.insertB(7);
  arbol.insertB(4);
  arbol.insertB(9);
  arbol.insertB(10);
  arbol.insertB(5);
  arbol.insertB(20);
  arbol.insertB(1);
  arbol.insertB(25);
  arbol.insertB(15);
  arbol.graficar();
  arbol.render();
  