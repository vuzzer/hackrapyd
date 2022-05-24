//const addToCartButtonElement = document.getElementsByClassName('add-to-cart');
const cartBadgeElements = document.querySelectorAll('#panier');

async function add(quantity, productId) {
  quantity = parseInt(quantity) + 1;
   let response;
   try {
    response = await fetch('/cart/items', {
      method: 'PATCH',
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Something went wrong!');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  } 

  const responseData = await response.json();
  update(responseData);
}


async function minus(quantity, productId) {
  quantity = parseInt(quantity) -1;
   let response;
   try {
    response = await fetch('/cart/items', {
      method: 'PATCH',
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Something went wrong!');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }  

  const responseData = await response.json();
  update(responseData);

}




async function delToCart(productId) {
  let response;
  try {
    response = await fetch('/cart/items/del', {
      method: 'POST',
      body: JSON.stringify({
        productId: productId,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    alert('Something went wrong!');
    return;
  }

  if (!response.ok) {
    //return;
  } 

  const responseData = await response.json();
  update(responseData);
}




async function addToCart(productId) {
  //const productId = addToCartButtonElement.dataset.productid;
  //const csrfToken = csrf;
  let response;
  try {
    response = await fetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        productId: productId,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    alert('Something went wrong!');
    return;
  }

  if (!response.ok) {
    //return;
  } 

  const responseData = await response.json();
  update(responseData);
}

function update(responseData) {
  const newTotalQuantity = responseData.newTotalItems;
  if (parseInt(newTotalQuantity)=== 1) {
    RemindBlock();
    chatbot.push();
  }

    //Empty shopping cart
    $("#my-carts").empty();
  
    //Create the cart of new product added to shopping cart
    for (i = 0; i < responseData.cart.items.length; i++){
      const item = responseData.cart.items[i];
      let cartShopping = ` <div class="col mb-6">
      <div class="card h-10 div2">
      <img src="${item.product.thumbnail}" alt="" class="card-img-top">
      <div class="card-body">
        <div class="card-title h5">
        ${item.product.title}
        </div>
        <a href="#" class="btn btn-outline-primary" data-price="${item.product.price}"><span
            class="h5">${item.product.price}</span></a>
        <span style="font-size: 18px;cursor:pointer;" onclick="delToCart('${item.product.id}')"   class="h3 badge badge-warning text-danger">&times;</span>

        <button class="btn" onclick="add('${item.quantity}','${item.product.id}')">
              <i class="fa-solid fa-plus"></i>
        </button>

        <span style="font-size: 18px;" class="h3 mx-auto badge badge-warning text-success">article ${item.quantity}</span>

        <button class="btn"  onclick="minus('${item.quantity}','${item.product.id}')">
                <i class="fa-solid fa-minus"></i>
        </button>
      </div>
      </div>
      </div>`;
      //Add    
      $(cartShopping).appendTo("#my-carts")   
    }
  
    //Shopping cart empty `buy` button is hidden else shown
    if (responseData.cart.items.length > 0) {
      let button =`<a href="#" class="btn btn-success w-100" onclick="paid('${responseData.cart.totalPrice}')"><span
      class=" h4">Buy</span> <span class="h4" id="total-amount">${responseData.cart.totalPrice}$</span></a>`
      $(".button-buy").empty();
      $(button).appendTo(".button-buy");
    } else {
      $(".button-buy").empty();
    }
  
    //Update item's number of shopping cart
    for (const cartBadgeElement of cartBadgeElements) {
      cartBadgeElement.textContent = newTotalQuantity;
    }

}


document.querySelectorAll('.add-to-cart').forEach(item => {
  item.addEventListener('click', event => {
    addToCart(item.dataset.productid)
  })
})


