var express = require('express');
const user_controller = require('../controller/userController');
const authMiddleware = require('../middleware/auth');

var router = express.Router();

//Create
router.post('/', user_controller.create_user);

// Update
router.put('/', user_controller.update_user);
//Delete
router.delete('/:id', user_controller.delete_user)
/* GET users listing. */
router.get('/', user_controller.list_user);

module.exports = router;
