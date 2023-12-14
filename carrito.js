let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');


openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})


//Sudaderas
let products = [
    {
        id: 1,
        name: 'Sudadera blanca Hokusai',
        image: 'sudadera1.jpg',
        price: 29.99
    },
    {
        id: 2,
        name: 'Sudadera One Piece',
        image: 'sudaderaOP.jpg',
        price: 29.99
    },
    {
        id: 3,
        name: 'Sudadera One Piece Zoro',
        image: 'sudadera3.jpg',
        price: 29.99
    },
    {
        id: 4,
        name: 'Sudadera Regreso al Futuro',
        image: 'sudadera4.jpg',
        price: 29.99
    },
    {
        id: 5,
        name: 'Sudadera capucha Brooklyn',
        image: 'sudadera5.jpg',
        price: 27.99
    },
    {
        id: 6,
        name: 'Sudadera Rocky Balboa',
        image: 'sudadera6.jpg',
        price: 29.99
    }
];
//Iniciar y poner las sudaderas
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <a href="detalle.html"><button>Detalle</button></a>
            <button onclick="addToCard(${key})">Comprar!</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
//Recargar la carta 
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

//Cambiar cantidad
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}