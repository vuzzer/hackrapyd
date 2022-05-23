"use strict";

var ModalCheckOut = document.querySelector('#ModalCheckOut');
var storyModal = document.querySelector('#zuck-modal');
var cartShops = document.querySelectorAll('#panier');
$("#shop-cart").click(function () {
  chatbot.onOrOff();
});

function adversitingCloseN() {
  modal.style.display = "none";
}

function modalCheck() {
  ModalCheckOut.style.display = "block";
}

function modalCheckClose() {
  ModalCheckOut.style.display = "none";
}

function storyModalClose() {
  storyModal.style.display = "none";
}

function buy() {
  return regeneratorRuntime.async(function buy$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('/orders/buy', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 3:
          response = _context.sent;
          console.log(response);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          alert('Something went wrong!');
          return _context.abrupt("return");

        case 11:
          if (response.ok) {
            _context.next = 14;
            break;
          }

          alert('Something went wrong!');
          return _context.abrupt("return");

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function paid(price) {
  //Enable checkout payment when user click on PAY
  $(".card.card__item").css({
    display: "none"
  });
  $.ajax({
    url: "http://localhost:3026/rapyd/checkout/".concat(price),
    type: "GET",
    dataType: "json",
    success: function success(data) {
      displayCheckout(data.body.data.id);
    }
  }); //Display loading gif

  $("#load").css({
    display: "block"
  }); //setTimeout(display, 900);

  $("#action").click(function (e) {
    //Hide card product
    $(".card.card__item").css({
      display: "block"
    }); //Display loading gif

    $("#feedback").hide();
  });

  function displayCheckout(idCheckout) {
    $("#load").css({
      display: "none"
    });
    var checkout = new RapydCheckoutToolkit({
      pay_button_text: "Payer maintenant",
      pay_button_color: "#4BB4D2",
      id: idCheckout,
      // your checkout page id goes here
      style: {
        submit: {
          base: {
            color: "white"
          }
        }
      }
    });
    checkout.displayCheckout();
    window.addEventListener("onCheckoutPaymentSuccess", function (event) {
      //console.log(event.detail);
      //Empty shopping cart
      buy();
      $("#my-carts").empty();
      $(".button-buy").empty(); //Update item's number of shopping cart

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = cartShops[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var cartBadgeElement = _step.value;
          cartBadgeElement.textContent = 0;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      feedback(event);
    });
    window.addEventListener("onCheckoutFailure", function (event) {
      //console.log(event.detail.error);
      feedback(event);
    });
    window.addEventListener("onCheckoutPaymentFailure", function (event) {
      //console.log(event.detail.error);
      feedback(event);
    });
  } // display information to the user


  function feedback(event) {
    if (event.detail.error) {
      document.getElementById("title").textContent = "Whoops!";
      document.getElementById("message").innerHTML = "We cannot process your payment:<br/>" + event.detail.error;
      document.getElementById("image").src = "img/no-bike.svg";
      document.getElementById("action").textContent = "Try again";
    } else {
      document.getElementById("title").textContent = "Success!";
      document.getElementById("message").innerHTML = "Thank you! Your product is on its way!" + "<br>" + "Order: " + event.detail.metadata.sales_order;
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


  var newTimeoutN = setTimeout(adversitingCloseN, 50);
  var newModalCheck = setTimeout(modalCheck, 100);
}

function storypaid(element) {
  var price = element.getAttribute("href"); //Enable checkout payment when user click on PAY

  $(".card.card__item").css({
    display: "none"
  });
  $.ajax({
    url: "http://localhost:3026/rapyd/checkout/".concat(price),
    type: "GET",
    dataType: "json",
    success: function success(data) {
      displayCheckout(data.body.data.id);
    }
  }); //Display loading gif

  $("#load").css({
    display: "block"
  }); //setTimeout(display, 900);

  $("#action").click(function (e) {
    //Hide card product
    $(".card.card__item").css({
      display: "block"
    }); //Display loading gif

    $("#feedback").hide();
  });

  function displayCheckout(idCheckout) {
    $("#load").css({
      display: "none"
    });
    var checkout = new RapydCheckoutToolkit({
      pay_button_text: "Payer maintenant",
      pay_button_color: "#4BB4D2",
      id: idCheckout,
      // your checkout page id goes here
      style: {
        submit: {
          base: {
            color: "white"
          }
        }
      }
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
    window.addEventListener("onCheckoutPaymentFailure", function (event) {
      console.log(event.detail.error);
      feedback(event);
    });
  } // display information to the user


  function feedback(event) {
    if (event.detail.error) {
      document.getElementById("title").textContent = "Whoops!";
      document.getElementById("message").innerHTML = "We cannot process your payment:<br/>" + event.detail.error;
      document.getElementById("image").src = "img/no-bike.svg";
      document.getElementById("action").textContent = "Try again";
    } else {
      document.getElementById("title").textContent = "Success!";
      document.getElementById("message").innerHTML = "Thank you! Your product is on its way!" + "<br>" + "Order: " + event.detail.metadata.sales_order;
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


  var cloeStory = setTimeout(storyModalClose, 50);
  var newTimeoutN = setTimeout(adversitingCloseN, 50);
  var newModalCheck = setTimeout(modalCheck, 100);
}