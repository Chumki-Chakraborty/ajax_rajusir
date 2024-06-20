const ajaxController = require("../controller/ajaxController");

const router = require("express").Router();


router.get('/ajax/show/user', ajaxController.createUser);
router.post('/ajax/create/user', ajaxController.createUserData);
router.get('/ajax/show/userdata', ajaxController.showUserData);
router.delete('/ajax/delete/userdata/:id', ajaxController.deleteUserData);
router.put('/ajax/edit/userdata/:id', ajaxController.updateUserData);
router.get('/jquery/form/validation', ajaxController.UserData);

module.exports = router;