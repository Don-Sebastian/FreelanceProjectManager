const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/user-details', userController.getUserDetails);
router.get("/all-active-products", userController.getAllActiveProducts);
router.get("/apply-project-user/:projectId", userController.getApplyForProject);

module.exports = router;