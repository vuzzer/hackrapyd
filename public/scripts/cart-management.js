//const addToCartButtonElement = document.getElementsByClassName('add-to-cart');
const cartBadgeElements = document.querySelectorAll('#panier');

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
  const newTotalQuantity = responseData.newTotalItems;
  if (parseInt(newTotalQuantity) === 1) {
    chatbot.push();
  }

  //Empty shopping cart
  $("#my-carts").empty();
  
  //Create the cart of new product added to shopping cart
  for (i = 0; i < responseData.cart.items.length; i++){
    const items = responseData.cart.items[i];
    let item = ` <div class="col mb-6">
    <div class="card h-10 div2">
    <img src="${items.product.thumbnail}" alt="" class="card-img-top">
    <div class="card-body">
      <div class="card-title h5">
      ${items.product.title}
      </div>
      <a href="#" class="btn btn-outline-primary" data-price="${items.product.price}"><span
          class="h5">${items.product.price}</span></a>
      <span style="font-size: 18px;" class="h3 badge badge-warning text-danger">&times;</span>
      <span style="font-size: 18px;" class="h3 mx-auto badge badge-warning text-success">${items.quantity}</span>
    </div>
    </div>
    </div>`;
    //Add    
    $(item).appendTo("#my-carts")   
  }

  console.log(responseData)

  //Update total amount
  if (responseData.cart.items.length > 1) {
    $("#total-amount").text(`( $ ${responseData.cart.totalPrice} )`);
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