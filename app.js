class Product {
    constructor ( type, brand, kilo, unit, price) {
        this.id = id;
        this.type = type;
        this.brand = brand;
        this.kilo = kilo;
        this.unit = unit;
        this.price = price;
        this.stock = stock;
    }
}

// array producto marca, precio y stock

const products = [
    {id: 1, type: "alimento", brand: "dogchow", kilo: 10, price: "2000", stock: 20,},
    {id: 3, type: "alimento", brand: "dogchow", kilo: 50, price: "3500", stock: 20,},
    {id: 2, type: "alimento", brand: "proplan", kilo: 10, price: "5000", stock: 10,},
    {id: 4, type: "alimento", brand: "proplan", kilo: 15, price: "8300", stock: 10,},
    {id: 5, type: "alimento", brand: "proplan", kilo: 20, price: "12000", stock: 5,},
    {id: 6, type: "collar", brand: "lv", unit: 1, price: "1500", stock: 20,},
    {id: 7, type: "buzo", brand: "mickey", unit: 1, price: "3000", stock: 20,},
    {id: 8, type: "campera", brand: "camperdog", unit: 1, price: "4000", stock: 20,}
]

// uso de Ajax como ruta interna para comunicarse con Json
// funcion agregar al carrito

const cart = [];

// Ajax

const URL = "../json/products.json";

$.ajax({
    method: "GET",
    url: URL,
    dataType: "JSON",
    
}).done((response) => {
    response.forEach((product) => {
        $("#ajax_container").append (
            `<p>${product.type} la marca es ${product.brand} y su precio es: $${product.price}</p>`
        )
    })
})

// Carrito

const buttonAddShop = document.querySelectorAll('.add-shop');
buttonAddShop.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClick);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('Click', comprarButtonClicked)

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

function addToCartClick (event) {
   const button = event.target;
   const item = button.closest('.item');
   
   const itemTitle = item.querySelector('.card-title').textContent;
   const itemPrice = item.querySelector('.item-price').textContent;
   const itemImage = item.querySelector('.item-image').src;

   addItemToShopCart(itemTitle, itemPrice, itemImage);
}

function addItemToShopCart (itemTitle, itemPrice, itemImage) {
    
    const elementsTitle = shoppingCartItemsContainer.getElementsByTagName('shoppingCardItemTitle');
    for(let i = 0; i < elementsTitle.length; i++){
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[i].parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            $('.toast').toast('show');
            updateShoppingCartTotal();
            return;
        }   
    }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
        <div class="row shoppingCartItem">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src=${itemImage} class="shopping-cart-image">
                    <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
                </div>
            </div>
            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                        value="1">
                    <button class="btn btn-danger buttonDelete" type="button">X</button>
                </div>
            </div>
        </div>`;

        shoppingCartRow.innerHTML = shoppingCartContent;
        shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow
        .querySelector('.buttonDelete')
        .addEventListener('click', removeShoppingCartItem);

    shoppingCartRow
        .querySelector('.shoppingCartItemQuantity')
        .addEventListener('change', quantityChanged);

    updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}






