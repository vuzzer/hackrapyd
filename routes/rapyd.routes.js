'use strict';
const express = require('express');
const router = express.Router();
const makeRequest = require('../util/utilities').makeRequest;

router.get('/checkout/:amount', async (req, res) => {
    let timestamp = Math.round( (new Date().getTime()) / 1000);
    try {
        const body = {
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
            "payment_method_types_include": [
                "sg_grabpay_ewallet"
            ],
            "expiration": timestamp + 1200,// 2 minutes
            "payment_method_types_exclude": []
        };
        const result = await makeRequest('POST', '/v1/checkout', body);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})


module.exports = router;