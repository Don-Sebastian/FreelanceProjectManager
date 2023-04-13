const express = require("express");
const AuthController = require("../controller/authController");

const router = express.Router();

router.post("/register-user", AuthController.postRegisterUser);
router.post("/login-user", AuthController.postloginUser);

router.post("/register-client", AuthController.postRegisterClient);
router.post("/login-client", AuthController.postloginClient);

module.exports = router;
