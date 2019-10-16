var express = require('express');
var router = express.Router();
const user_controller = require('../controller/userController');

/* GET users listing. */
router.get('/', user_controller.list_user);
//Creates
router.post('/', user_controller.create_user);
//Delete 
router.delete('/:id', user_controller.delete_user)
router.put('/notes/:id', note_controller.update_user);

module.exports = router;
