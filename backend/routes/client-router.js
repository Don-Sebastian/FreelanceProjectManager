const express = require('express');
const clientController = require('../controller/clientController');

const router = express.Router();

router.get("/client-details", clientController.getClientDetails);
router.post("/project-requirments-details", clientController.postProjectRequirmentDetails);
router.get("/project-list-client", clientController.getProjectListOfClient);

module.exports = router;