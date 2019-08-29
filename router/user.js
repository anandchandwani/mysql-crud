const router = require('express').Router();
const userController = require('../controller/userController');
const { check, validationResult } = require('express-validator');

router.get('/',userController.form);
router.post('/ragister',userController.validate('insertUser'),userController.insertUser);
router.get('/users',userController.getUsers);
router.get('/edit/:id',userController.editUser);
router.post('/update/:id',userController.updateUser);
router.get('/delete/:id',userController.deleteUser);



module.exports = router;
