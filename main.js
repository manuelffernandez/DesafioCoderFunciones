// Mejorar menu






const FRASE_BIENVENIDO = 'BIENVENIDO\n\nBienvenido al E-shop de café. Seleccione una opción.\n1.Ordenar pedido\n2.Salir';
const FRASE_COMPRA = 'COMPRA\n\nQue producto desea:\n1. Café  $30\n2. Jugo  $25\n3. Medialuna  $15\n4. Sandwich  $35';
const FRASE_MODIFICAR = 'MODIFICAR\n\nQue desea hacer:\n1.Seguir comprando\n2.Ir al carrito';
const FRASE_CARRITO = 'CARRITO\n\nRevise la consola para ver su pedido. Que desea hacer:\n1.Finalzar compra\n2.Volver';

let store = [
	{
		name: 'Café',
		price: 30,
		stock: 10
	},
	{
		name: 'Jugo',
		price: 25,
		stock: 10
	},
	{
		name: 'Medialuna',
		price: 15,
		stock: 10
	},
	{
		name: 'Sandwich',
		price: 35,
		stock: 10
	}
];

let cart = [];

function alertUser() {
	alert('El valor ingresado no es correcto. Porfavor coloque el número correspondiente a la opción que desea.');
}

//Pide que ingrese una opcion y devuelve lo elegido. Se repite si la opcion no es valida.
function getUserChoice(frase, options) {
	let desicion;

	while(true) {
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
	}
}

//Corrige el valor de getUserChoice() segun la seccion del menu en donde se encuentre 
function correctUserChoice(pointer, value, correction) {
	if (pointer === value) {
		pointer += correction;
	}
	return pointer
}

//Verifica que se escriba un numero en el prompt de getOrder() y retorna la cantidad
function getOrderQuantity() {
	let amount;

	while (true) {
		amount = parseInt(prompt('COMPRA\n\nElija la cantidad:'));

		if (typeof amount !== 'number') {
			alertUser();
			continue;
		} else {
			return amount;
		}
	}
}

function findProductInCart(productName) {
	return cart.find( item => item.name === productName);
}

function update(productFromStore, quantity) { 
	let cartObject = findProductInCart(productFromStore);

	productFromStore.stock -= quantity;

	if(cartObject === undefined) {
		cart = [...cart, {
			name: productFromStore.name,
			qty: quantity
		}];
	} else {
		cartObject.qty += quantity;
	}
}

function checkStock(product, stockToDecrement) { 
	if(product.stock < stockToDecrement) {
		alert('No hay stock disponible.');
		return false;
	}
	return true;
}

//Pide producto y cantidad y muestra por consola
function getOrder() {
	let chosenOption = getUserChoice(FRASE_COMPRA, 4);

	let product = store[chosenOption - 1];
	let quantity = getOrderQuantity();
	
	if(checkStock(product, quantity)) {
		update(product, quantity);
	}

	menu(correctUserChoice(getUserChoice(FRASE_MODIFICAR, 2), 2, 1));
}

function showOrder() {
	let total = 0;

	console.log('-'.repeat(70));
	console.log('Lo que queda en la tienda');
	console.table(store);
	console.log('Tu pedido es:');

	cart.forEach(product => {
		let productPrice = store.find(element => element.name === product.name)['price'];
		let subtotal = product.qty * productPrice;
		total += subtotal;
		console.log(`${product.qty} ${product.name} subtotal: $${subtotal}`);
	});
	console.log('Total: $' + total);
	console.log('-'.repeat(70));
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

function init() {
	menu(correctUserChoice(getUserChoice(FRASE_BIENVENIDO, 2), 2, 2));	
}

init();
