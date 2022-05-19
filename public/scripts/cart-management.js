//const addToCartButtonElement = document.getElementsByClassName('add-to-cart');
const cartBadgeElements = document.querySelectorAll('#panier');

async function addToCart(productId) {
  console.log('addToCart');
  //const productId = addToCartButtonElement.dataset.productid;
  //const csrfToken = csrf;
  console.log(productId)
  let response;
  try {
    response = await fetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        productId: productId,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    alert('Something went wrong!');
    return;
  }


  
/*   if (!response.ok) {
    alert('Something went wrong!');
    return;
  } */

  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems;

  for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent = newTotalQuantity;
  }
}

document.querySelectorAll('.add-to-cart').forEach(item => {
  item.addEventListener('click', event => {
    addToCart(item.dataset.productid)
  })
})