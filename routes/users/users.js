const express = require('express'); //import express


const router  = express.Router(); 

const usersController = require('../../controllers/users'); 

router.get('/users', usersController.getUsers);
router.post('/users', usersController.createUsers); 
router.put('/users', usersController.updateUsers); 
router.delete('/users', usersController.removeUsers); 

module.exports = router; // export to use in server.js