const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post(
  '/add',
  authController.protect,
  authController.restrictTo('admin'),
  userController.addUser
);
//router.post('/addAdmin', userController.addAdmin);

/*
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
*/
module.exports = router;
