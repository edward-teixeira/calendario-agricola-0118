const sessionController = require('../controller/sessionController');
const router = require('express').Router();

router.post('/', sessionController.sessionStore);

module.exports = router;
