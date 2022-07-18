var number = document.getElementById("price-to-deliver");

function fixNumber(number) {
    return Number.parseFloat(number).toFixed(2);
}

var inicio = 1; //se inicializa una variable en 0

function increase() { // se crean la funcion y se agrega al evento onclick en en la etiqueta button con id aumentar
    if (inicio < 10) { //se crea una condicion para que el valor del input no sea mayor a 10
        var cantidad = document.getElementById('cantidad').value = ++inicio; //se obtiene el valor del input, y se incrementa en 1 el valor que tenga.
    }
}

function decrease() { // se crean la funcion y se agrega al evento onclick en en la etiqueta button con id disminuir
    if (inicio > 1) { //se crea una condicion para que el valor del input no sea menor a 1
        var cantidad = document.getElementById('cantidad').value = --inicio; //se obtiene el valor del input, y se decrementa en 1 el valor que tenga.
    }
 }