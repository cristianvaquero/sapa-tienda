// ¿Cómo comunicarse con el HTML desde Js?

// 1- Llamar por id » document.getElementById("parrafo")
// 2- Llamar por class » document.getElementClassName("parrafo")
// 3- Llamar por etiqueta » document.getElementsByTagName("p")
// 4- Llamar de manera genérica » document.querySelector("") » #para los id / .para las class


// const trayendoElemento = document.querySelector(".parrafo").textContent;

// let miDivNota = document.querySelector("#nota");

// miDivNota.innerHTML += `<h2>Soy un texto agrega desde mi Js</h2>`

// console.log(trayendoElemento);
//Ejemplo del after
/*let productos = [{id: 1, nombre: "fideos", precio: 25},
                 {id: 2, nombre: "galletitas", precio: 65},
                 {id: 3, nombre: "lentejas", precio: 90},
                 {id: 4, nombre: "helado", precio: 210}]

let mostrarProductos = document.querySelector("#catalogo");

for (let i = 0; i < productos.length; i++) {
    mostrarProductos.innerHTML += `
        <div>
            <h3>${productos[i].nombre}</h3>
            <p>${productos[i].precio}</p>
            <button>Comprar</button>
        </div>
    `
} */




class Producto {
    constructor (nombre, categoria, peso, ahorro, precio) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.peso = peso;
        this.ahorro = ahorro;
        this.precio = Number(precio);
    }
}

//Array donde voy almacenando los objetos
const productos = [];
// const carrito = [];

//Segundo creo que los objetos
productos.push(new Producto ('Nutribon', 'Alimento para perros adultos', '15 kg', 'Ahorrás 15%', 2000));

let mostrarProductos = document.querySelector(".card-body");

for (let i = 0; i < Producto.length; i++) {
    mostrarProductos.innerHTML += `
        <div>
            <div style="display: flex;">
                <h5 style="color: blue; font-weight: bold;">${productos[i].precio}</h5>
                <h5 style="margin-left: 15px; color: red; font-size:16px; font-weight: bold;">${productos[i].ahorro}</h5>
            </div>
            <h3>${productos[i].nombre}</h3>
            <h5 style="font-size: 16px">${productos[i].categoria}</h5>
            <h5 style="font-size: 16px">${productos[i].peso}</h5>
            <button style="margin-top: 15px;">Comprar</button>
        </div>
    `
}
