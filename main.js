// Corregir Modificar y Comprar
//Crear clase para los objetos de store




let executeProgram = true;

const FRASE_BIENVENIDO = 'BIENVENIDO\nBienvenido al E-shop de café. Seleccione una opción:\n\n';
const FRASE_COMPRA_PRODUCTO = 'COMPRA\nQue producto desea:\n\n';
const FRASE_COMPRA_CANTIDAD = 'COMPRA\nElija la cantidad de ';
const FRASE_MODIFICAR_PRODUCTO = 'MODIFICAR\nSeleccione el producto del cual desea modificar la cantidad:\n\n';
const FRASE_MODIFICAR_CANTIDAD = 'MODIFICAR\nElija la cantidad que desea modificar de: ';
const FRASE_CARRITO = 'CARRITO\n\nRevise la consola para ver su pedido. Que desea hacer:\n1.Finalzar compra\n2.Volver';
const FRASE_SOLAPAMIENTO_PEDIDO = 'Usted ya tiene un pedido en el carrito.\n Si crea uno nuevo el anterior pedido se borrará. Está seguro?\n\n'

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
		func: modifyOrder
	},
	{
		name: 'Ver carrito',
		input: '3',
		func: showOrder	
	},
	{
		name: 'Ver store',
		input: '4',
		func: showStoreStock	
	},
	{
		name: 'Finalizar compra',
		input: '0',
		func: endProgram
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

let eraseCartMenu = [
	{
		name: 'Hacer un pedido nuevo',
		input: '1'
	},
	{
		name: 'Volver atrás',
		input: '2'
	}
];

let cart = [];


function modulo(a) {
	if(a < 0) {
		return -a;
	}
	return a
}

function alertUser() {
	alert('El valor ingresado no es correcto. Porfavor coloque el número correspondiente a la opción que desea.');
}

//Pide que ingrese una opcion y devuelve lo elegido. Se repite si la opcion no es valida.
function getUserChoice(frase, menuArray) {
	let desicion;

	while(true) {
		desicion = prompt(frase + showOptionsOfMenu(menuArray));

		for (let i = 0; i < menuArray.length; i++) {
			if (desicion == menuArray[i]['input']) {
				return desicion;
			}
		}
		alertUser();
	}
}

//Verifica que se escriba un numero en el prompt de getOrder() y retorna la cantidad
function getProductQuantity(frase, productFromStore, canReturnNegativeAmount = false) {
	while (true) {
		let amount = parseInt(prompt(frase + productFromStore.name));
		let isAmountNeg;

		if(canReturnNegativeAmount) {
			isAmountNeg = false;
		} else isAmountNeg = amount < 0;

		if (isNaN(amount) || isAmountNeg) {
			alertUser();
			continue;
		} else {
			return amount;
		}
	}
}

function findProductIn(arrayWhereSearch, productInputNumber) {
	return arrayWhereSearch.find( item => item.input === productInputNumber);
}

function updateCartAndStore(productObjectToSearchInCart, quantity) { //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	let cartObject = findProductIn(cart, productObjectToSearchInCart.input);
	let storeObject = store.find(element => element.input == productObjectToSearchInCart.input);

	if(cartObject === undefined) {
		cart = [...cart, {
			name: productObjectToSearchInCart.name,
			stock: quantity,
			input: productObjectToSearchInCart.input
		}];
		storeObject.stock -= quantity;
	} else {
		cartObject.stock += quantity;
		storeObject.stock.stock -= quantity;
	}

	for(let item of cart) {
		if (item.stock === 0) {
			cart.splice(cart.indexOf(item), 1)
		}
	}
}

function checkStock(productToCheck, stockToDecrement) { 
	if(productToCheck.stock < stockToDecrement) {
		alert(`No hay stock disponible. Puede agregar hasta ${productToCheck.stock} unidad/es más.`);
		return false;
	}
	return true;
}

function showOptionsOfMenu(menuArray) {
	let titlesArray = menuArray.map(elemento => elemento.input + '. ' + elemento.name);
	let titles = titlesArray.join('\n');

	return titles;
}

function defineProductAndAmount(arrayWhereSearchProductObject, fraseChoice, fraseQuantity, arrayToShowAvailableProducts, canReceiveNegativeAmount) {
	while(true) {
		let chosenOption = getUserChoice(fraseChoice, arrayToShowAvailableProducts);

		if(chosenOption == '0') {
			return
		}

		let productObject = findProductIn(arrayWhereSearchProductObject, chosenOption); 
		console.log(productObject);
		let quantity = getProductQuantity(fraseQuantity, productObject, canReceiveNegativeAmount);

		if(checkStock(productObject, modulo(quantity))) {
			updateCartAndStore(productObject, quantity);
		}
	}
}

function getOrder() {
	if(cart.length !== 0) {
		let desicion = getUserChoice(FRASE_SOLAPAMIENTO_PEDIDO, eraseCartMenu);

		if(desicion == '2') {
			return
		}

		for(let i = 0; i < cart.length; i++) {
			updateCartAndStore(cart[i], -cart[i]['stock'])
		}
	}
	defineProductAndAmount(store, FRASE_COMPRA_PRODUCTO, FRASE_COMPRA_CANTIDAD, store.concat({
		name: 'Volver al menú principal',
		input: '0'
	}), false);
}

function modifyOrder() {
	if(cart.length == 0) {
		alert('Usted no tiene ninguna orden para modificar.');
		return
	}
	// debugger
	defineProductAndAmount(cart, FRASE_MODIFICAR_PRODUCTO, FRASE_MODIFICAR_CANTIDAD, cart.concat({
		name: 'Volver al menú principal',
		input: '0'
	}), true);
}

function showStoreStock() {
	console.log('Lo que queda en la tienda:');
	console.table(store);
}

function showCart() {
	let total = 0;

	console.log('Tu pedido es:');
	cart.forEach(product => {
		let productPrice = store.find(element => element.name === product.name)['price'];
		let subtotal = product.stock * productPrice;
		total += subtotal;
		console.log(`${product.stock} ${product.name} subtotal: $${subtotal}`);
	});
	console.log('Total: $' + total);
}

function showOrder() {
	alert('Chequee la consola porfavor');
	console.log('-'.repeat(70));

	showCart();

	console.log('-'.repeat(70));
}

function endProgram() {
	alert(`Gracias por su compra!`);
	showCart();
	executeProgram = false;
}

function initMenu(menu) {
	while(executeProgram) {
		let desicion = getUserChoice(FRASE_BIENVENIDO, mainMenu);

		for (let i = 0; i < menu.length; i++) {
			if (menu[i].input === desicion) {
				menu[i].func();
			}
		}
	}
}

initMenu(mainMenu);
