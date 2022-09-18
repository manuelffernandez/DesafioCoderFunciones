let shop = document.getElementById('shop');
let cartList = document.getElementById('cartList');
console.log(shop);

let store = [
	{
		name: 'Café',
		price: 30,
		stock: 10,
		input: '1',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		img:'../src/assets/img/cards_img/coffee.jpg'
	},
	{
		name: 'Jugo',
		price: 25,
		stock: 10,
		input: '2',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		img:'../src/assets/img/cards_img/juice.jpg'
	},
	{
		name: 'Medialuna',
		price: 15,
		stock: 10,
		input: '3',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		img:'../src/assets/img/cards_img/medialuna.jpg'
	},
	{
		name: 'Sandwich',
		price: 35,
		stock: 10,
		input: '4',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		img:'../src/assets/img/cards_img/sandwich.jpg'
	}
];

let cart = [
	{
		name: 'Sandwich',
		price: 35,
		stock: 5,
		img:'../src/assets/img/cards_img/sandwich.jpg'
	},
	{
		name: 'Café',
		price: 30,
		stock: 3,
		img:'../src/assets/img/cards_img/coffee.jpg'
	}
];

function generateShop() {
	shop.innerHTML = store.map(function(product) {
		return `
		<div class="col-12 col-sm-6 col-lg-3">
			<div class="card">
				<img class="card-img-top img-fluid" src="${product.img}">
				<div class="card-body karla">
					<p class="card-title h5 font__400">${product.name}</p>
					<p class="card-text font__300">${product.desc}</p>
					<div class="d-flex justify-content-between">
						<p class="h5 fw-semibold m-0 karla">$${product.price}</p>
						<button class="h5 p-2 text-uppercase button__cart paytoneone">Agregar</button>
					</div>
				</div>
			</div>
		</div>
		`
	}).join("");
}

function generateCart() {
	for(let product of cart) {
		let row = document.createElement('div');
		row.className = 'container col-12 mb-3 py-2 d-flex justify-content-between border';
		row.innerHTML = `<div class="d-flex col-3">
							<img src="${product.img}" class="img-fluid cartList__img">
							<div class="d-flex flex-column justify-content-around">
								<p class="ms-2 mb-0 h4 paytoneone">${product.name}</p>
								<p class="ms-2 mb-0 h4 karla font__400">$${product.price}</p>
							</div>
						</div>
						<div class="col-1 offset-3 py-2 border border-dark my-auto d-flex justify-content-evenly">
								<p class="m-0 h4 karla font__400">-</p>
								<p class="m-0 h4 karla font__400">${product.stock}</p>
								<p class="m-0 h4 karla font__300">+</p>					
						</div>
						<div class="col-2 m-auto d-flex justify-content-end">
							<p class="ms-2 mb-0 h4 karla font__400">$175</p>
						</div>
						<div class="col-1 d-flex m-auto justify-content-center">
							<button class="p-3 border border-danger text-danger text-uppercase karla bg-transparent">Eliminar</button>
						</div>`;
		cartList.appendChild(row);
	}
}

generateShop();
generateCart();