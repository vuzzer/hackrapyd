const buttonBuy = document.querySelector('.btn-price');

function adversitingCloseN()  {
  modal.style.display = "none";
}
function paid(price)
{



  //Enable checkout payment when user click on PAY
  $(".btn-price").click((e) => {
    console.log('is running ...')
    e.preventDefault();

    $(".card.card__item").css({ display: "none" });

    $.ajax({
      url: `http://localhost:3026/rapyd/checkout/${price}`,
      type: "GET",
      dataType: "json",
      success: (data) => {
        displayCheckout(data.body.data.id);
      },
    });
    //Display loading gif
    $("#load").css({ display: "block" });
    //setTimeout(display, 900);
  });
    



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
        "Order: " +
        event.detail.metadata.sales_order;
      document.getElementById("image").src = "img/logo.svg";
      document.getElementById("action").textContent = "Home";
    }

    document.getElementById("action").href = "#";
    document.getElementById("feedback").style.display = "block";
  }

  /*     $('form').submit((e)=>{
        e.preventDefault();
        let synth = window.speechSynthesis;
        let inputTxt = $('.smart-agent-text').val();
        $.ajax({
            url: `http://localhost:5000/predict/${inputTxt}`,
            success:(data)=>{
                console.log('response', data);
                let message = `Etat du transformateur ${data.criticality}. Action : ${transfo[data.criticality]}`
                let utterThis = new SpeechSynthesisUtterance(message);
                synth.speak(utterThis);
            }
        })
    }) */


    const newTimeoutN = setTimeout(adversitingCloseN, 3000);

}