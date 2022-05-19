const buttonForBuy = document.querySelector('.btn.btn-finaliser-commande');

const productId = buttonForBuy.dataset.productid;
const csrfToken = buttonForBuy.dataset.csrf;

async function buy() {

  let response;
  try {
    response = await fetch('/orders', {
      method: 'POST',
          body: JSON.stringify({
            _csrf : csrfToken
          }),
      headers: {
        'Content-Type': 'application/json'
      }
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

  console.log(responseData.order);
  checkout(responseData.order);

}

buttonForBuy.addEventListener('click', buy);


async function checkout(responseData) {
    CinetPay.setConfig({
        apikey: '12912847765bc0db748fdd44.40081707',//   YOUR APIKEY
        site_id: '445160',//YOUR_SITE_ID
        notify_url: 'http://localhost/admin/products',
        mode: 'PRODUCTION'
    });
    CinetPay.getCheckout({
        transaction_id: Math.floor(Math.random() * 100000000).toString(),
        amount: responseData.productData.totalPrice,
        currency: 'XOF',
        channels: 'ALL',
        description: 'Test de paiement',   
         //Fournir ces variables pour le paiements par carte bancaire
        customer_name:responseData.userData.name.split(' ')[1],//Le nom du client
        customer_surname:responseData.userData.name.split(' ')[0],//Le prenom du client
        customer_email: responseData.userData.email,//l'email du client
        customer_phone_number: "088767611",//l'email du client
        customer_address : responseData.userData.address.street,//addresse du client
        customer_city: responseData.userData.address.city,// La ville du client
        customer_country : "CM",// le code ISO du pays
        customer_state : "CM",// le code ISO l'état
        customer_zip_code : responseData.userData.address.postalCode, // code postal

    });
    CinetPay.waitResponse(async function(data) {
        if (data.status == "REFUSED") {
          window.location.replace("http://localhost:3000/echec");
        } else if (data.status == "ACCEPTED") {
          window.location.replace("http://localhost:3000/success");

          response = await fetch('/orders/buy', {
            method: 'POST',
                body: JSON.stringify({
                  _csrf : csrfToken,
                  order: responseData
                }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

        }
    });
    CinetPay.onError(function(data) {
        console.log(data);
    });
}