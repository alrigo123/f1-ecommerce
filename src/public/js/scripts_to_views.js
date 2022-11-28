var number = document.getElementById("price-to-deliver");


function fixNumber(number) {
    return Number.parseFloat(number).toFixed(2);
}

/* estas funciones de aumentar y dismunir van en el back-end del carrito para validar segun el stock del producto */

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


var cantidad = document.getElementById('cantidad').value

var product_price = parseFloat(document.getElementById('product-price').value)

function totalByQuantity() {
    console.log(product_price)
    console.log(cantidad)

    document.getElementById('subtotal_result').value = total;

    const show = document.getElementById('subtotal_result')
    show.innerHTML = total
}
