'use strict';

var express = require('express');

var router = express.Router();

var makeRequest = require('../util/utilities').makeRequest;

router.get('/checkout/:amount', function _callee(req, res) {
  var timestamp, body, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          timestamp = Math.round(new Date().getTime() / 1000);
          _context.prev = 1;
          body = {
            "amount": req.params.amount,
            "complete_payment_url": "http://example.com/complete",
            "country": "SG",
            "currency": "SGD",
            "error_payment_url": "http://example.com/error",
            "merchant_reference_id": "950ae8c6-78",
            "cardholder_preferred_currency": true,
            "language": "en",
            "metadata": {
              "merchant_defined": true
            },
            "payment_method_types_include": ["sg_grabpay_ewallet"],
            "expiration": timestamp + 1200,
            // 2 minutes
            "payment_method_types_exclude": []
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(makeRequest('POST', '/v1/checkout', body));

        case 5:
          result = _context.sent;
          res.json(result);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          res.json(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
module.exports = router;