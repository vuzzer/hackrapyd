const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/signup', authController.getSignup);

router.get('/profil', authController.getProfil);

router.post('/signup', authController.signup);

router.get('/login', authController.getLogin);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;