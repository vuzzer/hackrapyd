const ModalCheckOut = document.querySelector('#ModalCheckOut');
const storyModal = document.querySelector('#zuck-modal');
const cartShops = document.querySelectorAll('#panier');

$("#shop-cart").click(() => {
  chatbot.onOrOff()
});


function adversitingCloseN()  {
  modal.style.display = "none";
}

function modalCheck()  {
  ModalCheckOut.style.display = "block";
}
function modalCheckClose()  {
  ModalCheckOut.style.display = "none";
  $("iframe").remove();
}

function storyModalClose()
{
  storyModal.style.display="none";
}

async  function buy() {
  try {
    response = await fetch('/orders/buy', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  console.log(response);
  } catch (error) {
    alert('Something went wrong!');
    return;
  }
  
  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }
}


function paid(price)
{
  //Enable checkout payment when user click on PAY

    $(".card.card__item").css({ display: "none" });
    $.ajax({
      url: `/rapyd/checkout/${price}`,
      type: "GET",
      dataType: "json",
      success: (data) => {
        displayCheckout(data.body.data.id);
      },
    });
    //Display loading gif
    $("#load").css({ display: "block" });
    //setTimeout(display, 900);
  

  $("#action").click((e) => {
    //Hide card product
    $(".card.card__item").css({ display: "block" });

    //Display loading gif
    $("#feedback").hide();
  });


  function displayCheckout(idCheckout) {
    $("#load").css({ display: "none" });

    let checkout = new RapydCheckoutToolkit({
      pay_button_text: "Payer maintenant",
      pay_button_color: "#4BB4D2",
      id: idCheckout, // your checkout page id goes here
      style: {
        submit: {
          base: {
            color: "white",
          },
        },
      },
    });
    checkout.displayCheckout();

    window.addEventListener("onCheckoutPaymentSuccess", function (event) {
      //console.log(event.detail);

      //Empty shopping cart
      buy();
      $("#my-carts").empty();
      $(".button-buy").empty();

      //Update item's number of shopping cart
      for (const cartBadgeElement of cartShops) {
        cartBadgeElement.textContent = 0;
      } 

      feedback(event);
    });
    window.addEventListener("onCheckoutFailure", function (event) {
      //console.log(event.detail.error);
      feedback(event);
    });
    window.addEventListener("onCheckoutPaymentFailure", (event) => {
      //console.log(event.detail.error);
      feedback(event);
    });
  }

  // display information to the user
  function feedback(event) {
    if (event.detail.error) {
      document.getElementById("title").textContent = "Whoops!";
      document.getElementById("message").innerHTML =
        "We cannot process your payment:<br/>" + event.detail.error;
      document.getElementById("image").src = "/img/failure.png";
      document.getElementById("action").textContent = "Try again";
    } else {
      document.getElementById("title").textContent = "Success!";
      document.getElementById("message").innerHTML =
        "Thank you! Your product is on its way!" +
        "<br>" +
        "Payment: " +
        event.detail.id;
      document.getElementById("image").src = "/img/success.png";
      document.getElementById("action").textContent = "Home";
    }

    document.getElementById("action").href = "#";
    document.getElementById("feedback").style.display = "block";
  }


    const newTimeoutN = setTimeout(adversitingCloseN, 50);
    const newModalCheck = setTimeout(modalCheck, 100);
    const newModalGame= setTimeout(GameNone, 100);

}


 

  function storypaid(element)
  {
   
      
        var  price = element.getAttribute("href");
  
 
  

  
    //Enable checkout payment when user click on PAY
  
      $(".card.card__item").css({ display: "none" });
  
      $.ajax({
        url: `/rapyd/checkout/${price}`,
        type: "GET",
        dataType: "json",
        success: (data) => {
          displayCheckout(data.body.data.id);
        },
      });
      //Display loading gif
      $("#load").css({ display: "block" });
      //setTimeout(display, 900);
    
      
  
  
  
    $("#action").click((e) => {
      //Hide card product
      $(".card.card__item").css({ display: "block" });
  
      //Display loading gif
      $("#feedback").hide();
    });
  
      
  
    function displayCheckout(idCheckout) {
      $("#load").css({ display: "none" });
  
      let checkout = new RapydCheckoutToolkit({
        pay_button_text: "Payer maintenant",
        pay_button_color: "#4BB4D2",
        id: idCheckout, // your checkout page id goes here
        style: {
          submit: {
            base: {
              color: "white",
            },
          },
        },
      });
      checkout.displayCheckout();
  
      window.addEventListener("onCheckoutPaymentSuccess", function (event) {
        console.log(event.detail);
        feedback(event);
      });
      window.addEventListener("onCheckoutFailure", function (event) {
        console.log(event.detail.error);
        feedback(event);
      });
      window.addEventListener("onCheckoutPaymentFailure", (event) => {
        console.log(event.detail.error);
        feedback(event);
      });
    }
  
    // display information to the user
    function feedback(event) {
      if (event.detail.error) {
        document.getElementById("title").textContent = "Whoops!";
        document.getElementById("message").innerHTML =
          "We cannot process your payment:<br/>" + event.detail.error;
        document.getElementById("image").src = "https://i.pinimg.com/originals/d0/17/47/d01747c4285afa4e7a6e8656c9cd60cb.png";
        document.getElementById("action").textContent = "Try again";
      } else {
        document.getElementById("title").textContent = "Success!";
        document.getElementById("message").innerHTML =
          "Thank you! Your product is on its way!" +
          "<br>" +
          "Payment: " +
          event.detail.id;
        document.getElementById("image").src = "https://www.nicepng.com/png/detail/362-3624869_icon-success-circle-green-tick-png.png";
        document.getElementById("action").textContent = "Home";
      }
  
      document.getElementById("action").href = "javascript:void(0)";
      document.getElementById("feedback").style.display = "block";
    }
  
      const cloeStory = setTimeout(storyModalClose, 50);
      const newTimeoutN = setTimeout(adversitingCloseN, 50);
      const newModalCheck = setTimeout(modalCheck, 100);
      const newModalGame= setTimeout(GameNone, 100);
  
  }



  function gamepaid(price)
  {
   
      
      
  
 
  

  
    //Enable checkout payment when user click on PAY
  
      $(".card.card__item").css({ display: "none" });
  
      $.ajax({
        url: `/rapyd/checkout/${price}`,
        type: "GET",
        dataType: "json",
        success: (data) => {
          displayCheckout(data.body.data.id);
        },
      });
      //Display loading gif
      $("#load").css({ display: "block" });
      //setTimeout(display, 900);
    
      
  
  
  
    $("#action").click((e) => {
      //Hide card product
      $(".card.card__item").css({ display: "block" });
  
      //Display loading gif
      $("#feedback").hide();
    });
  
      
  
    function displayCheckout(idCheckout) {
      $("#load").css({ display: "none" });
  
      let checkout = new RapydCheckoutToolkit({
        pay_button_text: "Payer maintenant",
        pay_button_color: "#4BB4D2",
        id: idCheckout, // your checkout page id goes here
        style: {
          submit: {
            base: {
              color: "white",
            },
          },
        },
      });
      checkout.displayCheckout();
  
      window.addEventListener("onCheckoutPaymentSuccess", function (event) {
        console.log(event.detail);
        feedback(event);
      });
      window.addEventListener("onCheckoutFailure", function (event) {
        console.log(event.detail.error);
        feedback(event);
      });
      window.addEventListener("onCheckoutPaymentFailure", (event) => {
        console.log(event.detail.error);
        feedback(event);
      });
    }
  
    // display information to the user
    function feedback(event) {
      if (event.detail.error) {
        document.getElementById("title").textContent = "Whoops!";
        document.getElementById("message").innerHTML =
          "We cannot process your payment:<br/>" + event.detail.error;
        document.getElementById("image").src = "img/no-bike.svg";
        document.getElementById("action").textContent = "Try again";
      } else {
        document.getElementById("title").textContent = "Success!";
        document.getElementById("message").innerHTML =
          "Thank you! Your product is on its way!" +
          "<br>" +
          "Payment: " +
          event.detail.id;
        document.getElementById("image").src = "img/logo.svg";
        document.getElementById("action").textContent = "Home";
      }
  
      document.getElementById("action").href = "#";
      document.getElementById("feedback").style.display = "block";
    }
  
      const cloeStory = setTimeout(storyModalClose, 50);
      const newTimeoutN = setTimeout(adversitingCloseN, 50);
      const newModalCheck = setTimeout(modalCheck, 100);
      const newModalGame= setTimeout(GameNone, 100);
  
  }