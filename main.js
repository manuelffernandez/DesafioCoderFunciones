const FRASE_BIENVENIDO = 'BIENVENIDO\n\nBienvenido al E-shop de café. Seleccione una opción.\n1.Ordenar pedido\n2.Salir';
const FRASE_COMPRA = 'COMPRA\n\nQue producto desea:\n1. Café  $30\n2. Jugo  $25\n3. Medialuna  $15\n4. Sandwich  $35';
const FRASE_MODIFICAR = 'MODIFICAR\n\nQue desea hacer:\n1.Seguir comprando\n2.Ir al carrito';
const FRASE_CARRITO = 'CARRITO\n\nRevise la consola para ver su pedido. Que desea hacer:\n1.Finalzar compra\n2.Volver';

let cart = {
	1: {
		name: 'Café',
		price: 30,
		quantity: 0
	},
	2: {
		name: 'Jugo',
		price: 25,
		quantity: 0
	},
	3: {
		name: 'Medialuna',
		price: 15,
		quantity: 0
	},
	4: {
		name: 'Sandwich',
		price: 35,
		quantity: 0
	}
}

function alertUser() {
	alert('El valor ingresado no es correcto. Porfavor coloque el número correspondiente a la opción que desea.');
}

//Pide que ingrese una opcion y devuelve lo elegido. Se repite si la opcion no es valida.
function getUserChoice(frase, options) {
	let desicion;

	do {
		desicion = parseFloat(prompt(frase));
		if(typeof desicion !== 'number') {
			alertUser();
			continue;
		}

		for (let i = 1; i <= options; i++) {
			if (desicion === i) {
				return desicion;
			}
		}
		alertUser();
	} while(true)
}

//Corrige el valor de getUserChoice() segun la seccion del menu en donde se encuentre
function correctUserChoice(pointer, value, correction) {
	if (pointer === value) {
		pointer += correction;
	}
	return pointer
}

//Verifica que se escriba un numero en el prompt de getOrder() y retorna la cantidad
function getProductQuantity() {
	let amount;

	while (true) {
		amount = parseInt(prompt('COMPRA\n\nElija la cantidad:'));

		if (typeof amount !== 'number') {
			errMsg();
			continue;
		} else {
			return amount;
		}
	}
}

//Pide producto y cantidad y muestra por consola
function getOrder() {
	let elegido = getUserChoice(FRASE_COMPRA, 4);
	let cantidad = getProductQuantity();
	
	incrementCart(elegido, cantidad);

	menu(correctUserChoice(getUserChoice(FRASE_MODIFICAR, 2), 2, 1));
}

function showOrder() {
	let total = 0;

	console.log('-'.repeat(40))
	console.log('Tu pedido es:');
	for(const [key, obj] of Object.entries(cart)) {
		if(obj.quantity !== 0) {
			total += obj.quantity * obj.price;
			console.log(`${obj.quantity} ${obj.name} subtotal: $${obj.quantity * obj.price}`);
		}
	}
	console.log('Total: $' + total);
}

function incrementCart(id, cantidad) {
	cart[id]['quantity'] += cantidad;
}


function menu(section) {
	switch (section) {
		case 1:
		//COMPRAR
			getOrder();
			break;
		case 2:
		//MODIFICAR
			menu(correctUserChoice(getUserChoice(FRASE_MODIFICAR, 2), 2, 1));
			break;
		case 3:
		//CARRITO
			showOrder();
			menu(correctUserChoice(getUserChoice(FRASE_CARRITO, 2), 1, 3));
			break;
		case 4:
		//SALIDA
			alert('SALIDA\n\nGracias por su compra!');
			break;
	}
}

menu(correctUserChoice(getUserChoice(FRASE_BIENVENIDO, 2), 2, 2));
