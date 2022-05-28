"use strict";

function searchProducts(product) {
  var response, responseData;
  return regeneratorRuntime.async(function searchProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('/products/search', {
            method: 'POST',
            body: JSON.stringify({
              search: product
            }),
            headers: {
              'Content-Type': 'text/html'
            }
          }));

        case 3:
          response = _context.sent;
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          alert('Something went wrong!');
          return _context.abrupt("return");

        case 10:
          if (response.ok) {
            _context.next = 13;
            break;
          }

          alert('Something went wrong!');
          return _context.abrupt("return");

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(response.text());

        case 15:
          responseData = _context.sent;
          console.log(responseData);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

$('#product-name').on({
  keyup: function keyup() {
    var value = $("#product-name").val().trim();
    searchProducts(value);
  },
  blur: function blur() {
    $('#product-name').val('');
  }
});