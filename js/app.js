
// Const
const cart = []
const cartList = document.querySelector('#lista-carrito tbody')
const addToCartClass = 'agregar-carrito';
const removeFromCartClass = 'borrar-curso'
const deleteButton = function () {
    const button =  document.createElement('a')
    button.classList = 'borrar-curso'
    button.innerText = 'X'
    return button;
}
// End const


// Event listeners
document.getElementById('lista-cursos').addEventListener('click', addToCartClicked)
document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage)
document.getElementById('vaciar-carrito').addEventListener('click', clearCart)
cartList.addEventListener('click', removeFromCart)
// End event listeners



function addToCartClicked(e) {
    e.preventDefault();
    if (e.target.className.includes(addToCartClass))
    addToCart(buildItemToAdd(e.target.parentElement.parentElement))
}

function addToCart(itemToAdd, store = true) {
    if(store && alreadyInCart(itemToAdd)) {
        alert(`The course ${itemToAdd.name} is already in cart`)
        return
    }

    const newRow = addRow(cartList)
    newRow.setAttribute('data-id', itemToAdd.id)      
    //set image
    const rowImage = newRow.appendChild(document.createElement('td'))
    rowImage.appendChild(createImageHTML(itemToAdd.image))

    //set name
    const rowName = newRow.appendChild(document.createElement('td'))
    rowName.innerText = itemToAdd.name;

    //set price
    const rowPrice = newRow.appendChild(document.createElement('td'))
    rowPrice.innerText = itemToAdd.price

    //add deleteButton 
    const rowDeleteBtn = newRow.appendChild(document.createElement('td'))
    rowDeleteBtn.appendChild(deleteButton())

    if (store) {
        addToLocalStorage(itemToAdd)
    }
}


function loadCartFromLocalStorage() {
    let carts = getCartFromLocalStorage();
    carts.forEach(c => {
        addToCart(c, false)
    })
}

function addToLocalStorage(item) {
    let cart = getCartFromLocalStorage()
    
    cart.push(item)
    
    localStorage.setItem('cart', JSON.stringify(cart))

}

function alreadyInCart(item) {
    return getCartFromLocalStorage().some(c => c.id == item.id)
}

function getCartFromLocalStorage() {
    return localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : [];
}

function buildItemToAdd(item) {
    let itemToAdd = {
        name: (item.querySelector('.info-card').querySelector('h4').innerText),
        image: (item.querySelector('.imagen-curso').src),
        price: item.querySelector('.precio span').innerText,
        id: item.querySelector('.agregar-carrito').getAttribute('data-id')
    }
    return itemToAdd;
}

function addRow(list) {
    const li = document.createElement('tr')
    list.appendChild(li);
    return li;
}

function createImageHTML(image) {
    const imageHTML = document.createElement('IMG')
    imageHTML.setAttribute("src", image)
    return imageHTML
}

function clearCart() {
    localStorage.clear()
    while(cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
}

function removeFromCart(e) {
    e.preventDefault()
    if (e.target.className.includes(removeFromCartClass)) {
        const courseToRemove = e.target.parentElement.parentElement
        removeFromLocalStorage(courseToRemove.getAttribute('data-id'))
        courseToRemove.remove()
    }
}

function removeFromLocalStorage(id) {
    let cart = getCartFromLocalStorage().filter(c => c.id != id)
    localStorage.setItem('cart', JSON.stringify(cart))
}
