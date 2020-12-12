// This program demonstrates Family Pizza website for oder pizza.
//
//https://www.w3schools.com/js/js_ajax_intro.asp
//https://www.w3schools.com/js/js_json_intro.asp

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
//    console.log('ready')

    let removeCartItemButtons = document.getElementsByClassName('btn-danger');

    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input');

    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    
    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
    document.getElementsByClassName('btn-order')[0].addEventListener('click', updateCartTotal);
}

function orderClicked(){
//    console.log('orderClicked')

    let cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    document.getElementById('fname').value = "";
    document.getElementById('address').value = "";
    document.getElementById('phoneNumber').value = "";
    document.getElementById('comment').value = "";
    updateCartTotal()
}


function removeCartItem(event) {
//    console.log('removeCartItem')

    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
//    console.log('quantityChanged')

    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal()
}

function selectionChanged(event) {
//    console.log('selectionChanged')

    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal()
}

function addToCartClicked(event) {
//    console.log('addToCartClicked')

    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
//    console.log('addItemToCart')

    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This pizza is already added to the cart');
            return
        }
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <select class="cart-item-toppings" onchange="updateCartTotal()" name="toppings" id="toppings_select">
            <option class="cart-toppings-selected" value="0" hidden="">None</option>
            <option class="cart-toppings-selected" value="0">None</option>
            <option class="cart-toppings-selected" value="0.5">Onion________________+$0.5</option>
            <option class="cart-toppings-selected" value="1.2">Tomatos_____________+$1.2</option>
            <option class="cart-toppings-selected" value="3">Chiken_______________+$3</option>
            <option class="cart-toppings-selected" value="3">Mushrooms__________+$3</option>
            <option class="cart-toppings-selected" value="4">Bacon________________+$4</option>
            <option class="cart-toppings-selected" value="4">Cheese_______________+$4</option>
        </select>
        <select class="cart-item-size" onchange="updateCartTotal()" name="size" id="size_select">
            <option class="cart-size-selected" value="0">Medium</option>
            <option class="cart-size-selected" value="5">Large_________________+$5</option>
            <option class="cart-size-selected" value="8">Exrta Large___________+$8</option>
        </select>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
        `
        cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

var check = 0

function updateCartTotal() {
//    console.log('updateCartTotal')

    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let order = 0;
    let taxes = 0;
    let total = 0

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let toppingsElement =  cartRow.getElementsByClassName("cart-item-toppings")[0];
        let toppings = toppingsElement.options[toppingsElement.selectedIndex].value;
        let valueOfSize = cartRow.getElementsByClassName("cart-item-size")[0];
        let size = valueOfSize.options[valueOfSize.selectedIndex].value;
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let quantity = quantityElement.value;
        let selectedAdd = +toppings + +size;
        order = Math.floor((total + (price * quantity + selectedAdd))*100)/100;
        taxes = order/10;
        total = order + taxes;
    }
    document.getElementsByClassName('cart-order-price')[0].innerText = '$' + order;
    document.getElementsByClassName('cart-taxes-price')[0].innerText = '$' + taxes.toFixed(2);
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total.toFixed(2);
    check = total.toFixed(2)
}

function createOrder() {
//    console.log('createOrder')

    let val = validation()
    if (val == true) {
        let cartItemContainer = document.getElementsByClassName('cart-items')[0];
        let cartRows = cartItemContainer.getElementsByClassName('cart-row');
        let order = 0;
        let taxes = 0;
        let total = 0;
        check = 0;
    
        var cartTemporaryValues = [];
        for (let i = 0; i < cartRows.length; i++) {
            let cartRow = cartRows[i];
            let pizzaName = cartRow.getElementsByClassName('cart-item-title')[0].innerText;
            let toppingsElement =  cartRow.getElementsByClassName("cart-item-toppings")[0];
            let toppings = toppingsElement.options[toppingsElement.selectedIndex].value;
            let valueOfSize = cartRow.getElementsByClassName("cart-item-size")[0];
            let size = valueOfSize.options[valueOfSize.selectedIndex].value;
            let priceElement = cartRow.getElementsByClassName('cart-price')[0];
            let price = parseFloat(priceElement.innerText.replace('$', ''));
            let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
            let quantity = quantityElement.value;
            let selectedAdd = +toppings + +size;
            order = Math.floor((total + (price * quantity + selectedAdd))*100)/100;
            taxes = order/10;
            total = order + taxes;
            var cartValues = {
                pizzaName: pizzaName,
                toppings: toppings,
                size: size,
                price: price,
                quantity: quantity
            }
            cartTemporaryValues.push(cartValues);
        }
        document.getElementsByClassName('cart-order-price')[0].innerText = '$' + order;
        document.getElementsByClassName('cart-taxes-price')[0].innerText = '$' + taxes.toFixed(2);
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total.toFixed(2);
    
        let orderName = document.getElementsByClassName("form-container-block-name")[0].value;
        let orderAddress = document.getElementsByClassName("form-container-block-address")[0].value;
        let orderPhone = document.getElementsByClassName("form-container-block-phone")[0].value;
        let orderComment = document.getElementsByClassName("form-container-block-comment")[0].value;
    
        var FullCartValues = {
            pizza_orders: cartTemporaryValues,
            total_price: total,
            orderName: orderName,
            orderAddress: orderAddress,
            orderPhone: orderPhone,
            orderComment: orderComment
        }
        return postClick(FullCartValues);
    }
}

function postClick(FullCartValues) {
//    console.log('postClick')

    alert('Thank you for your order');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
    
    xhr.setRequestHeader('Content-Type', "application/json");
    
    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
    
      alert( this.responseText );
    }
    xhr.send(FullCartValues);

    orderClicked()
}

function validation() {
//    console.log('validation');

    let nameValue = document.getElementById('fname').value;
    let addressValue = document.getElementById('address').value;
    let numberValue = document.getElementById('phoneNumber').value;
    let commentValue = document.getElementById('comment').value;
    let re = /^\d[\d\(\)\ -]{4,14}\d$/;
    let validPhone = re.test(numberValue);

    if(check == 0) {
        alert ('Please, choose pizza!');
        return false;
    }
    if(nameValue == '') {
//         let error = 'Name field is required';
//         document.getElementById('fname-prompt').innerHTML = error;
        alert ('Name field is required');
        return false;
    }
    if (addressValue == '') {
        alert('Address field is required');
        return false;
    }
    if (numberValue == '') {
        alert ('Number field is required');
        return false;
    }
    if (!validPhone) {
        alert ('Number error, please write correct number');
        return false;
    }
    return true;
}
