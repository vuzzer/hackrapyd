"use strict";

var express = require('express');

var router = express.Router();
router.get('/', function (req, res) {
  res.redirect('/products');
});
router.get('/success', function (req, res) {
  res.render('success');
});
router.get('/echec', function (req, res) {
  res.render('echec');
});
router.get('/401', function (req, res) {
  res.status(401).render('shared/401');
});
router.get('/403', function (req, res) {
  res.status(403).render('shared/403');
});
module.exports = router;