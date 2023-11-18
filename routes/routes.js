const express = require("express");
const router = express.Router()
const authController = require("../controllers/authController")

router.post('/auth/register', authController.UserRegister)
router.post('/auth/login', authController.UserLogin)

module.exports = router