// Corregir Modificar y Comprar






const FRASE_BIENVENIDO = 'BIENVENIDO\nBienvenido al E-shop de café. Seleccione una opción:\n\n';
const FRASE_COMPRA = 'COMPRA\nQue producto desea:\n\n';
const FRASE_MODIFICAR = 'MODIFICAR\n\nQue desea hacer:\n1.Seguir comprando\n2.Ir al carrito';
const FRASE_CARRITO = 'CARRITO\n\nRevise la consola para ver su pedido. Que desea hacer:\n1.Finalzar compra\n2.Volver';

let store = [
	{
		name: 'Café',
		price: 30,
		stock: 10,
		input: '1'
	},
	{
		name: 'Jugo',
		price: 25,
		stock: 10,
		input: '2'
	},
	{
		name: 'Medialuna',
		price: 15,
		stock: 10,
		input: '3'
	},
	{
		name: 'Sandwich',
		price: 35,
		stock: 10,
		input: '4'
	}
];

let mainMenu =  [
	{
		name: 'Ordenar pedido',
		input: '1',
		func: getOrder
	},
	{
		name: 'Modificar compra',
		input: '2',
		func: 0
	},
	{
		name: 'Ver carrito',
		input: '3',
		func: showOrder	
	},
	{
		name: 'Finalizar compra',
		input: '0',
		func: 0
	}
];

let productsMenu = store.map(element => {
	return {
		name: element.name + ' $' + element.price.toString(),
		input: element.input
	}
}).concat({
	name: 'Volver al menú principal',
	input: '0'
});

let cart = [];


function alertUser() {
	alert('El valor ingresado no es correcto. Porfavor coloque el número correspondiente a la opción que desea.');
}

//Pide que ingrese una opcion y devuelve lo elegido. Se repite si la opcion no es valida.
function getUserChoice(frase, array) {
	let desicion;

	while(true) {
		desicion = parseFloat(prompt(frase + showOptions(array)));

		for (let i = 0; i <= array.length; i++) {
			if (desicion === i) {
				desicion = desicion.toString();
				return desicion;
			}
		}
		alertUser();
	}
}

//Verifica que se escriba un numero en el prompt de getOrder() y retorna la cantidad
function getOrderQuantity() {

	while (true) {
		let amount = parseInt(prompt('COMPRA\n\nElija la cantidad:'));

		if (isNaN(amount) || amount < 0) {
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

function findProductInStore(input) {
	return store.find(element => element.input == input);
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

function checkStock(productFromStore, stockToDecrement) { 
	if(productFromStore.stock < stockToDecrement) {
		alert('No hay stock disponible.');
		return false;
	}
	return true;
}

function showOptions(array) {
	let titlesArray = array.map(elemento => elemento.input + '. ' + elemento.name);
	let titles = titlesArray.join('\n');

	return titles;
}

//Pide producto y cantidad y muestra por consola
function getOrder() {
	while(true) {
		let chosenOption = getUserChoice(FRASE_COMPRA, productsMenu);

		if(chosenOption == '0') {
			return
		}

		let quantity = getOrderQuantity();
		let product = findProductInStore(chosenOption);

		if(checkStock(product, quantity)) {
			update(product, quantity);
		}
	}
}

function showOrder() {
	alert('Chequee la consola porfavor');
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

function initMenu(menu) {
	while(true) {
		let desicion = getUserChoice(FRASE_BIENVENIDO, mainMenu);

		for (let i = 0; i < menu.length; i++) {
			if (menu[i].input === desicion) {
				menu[i].func();
			}
		}
	}
}

initMenu(mainMenu);
