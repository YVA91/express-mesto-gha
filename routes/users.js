const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAratar,
  getThisUser,
} = require('../controllers/users');
const {
  validationGetUserById,
  validationUpdateUserInfo,
  validationUpdateUserAratar,
} = require('../validation/validation');

router.get('/users', getUsers);
router.get('/users/me', getThisUser);
router.get('/users/:userId', validationGetUserById, getUserById);
router.patch('/users/me', validationUpdateUserInfo, updateUserInfo);
router.patch('/users/me/avatar', validationUpdateUserAratar, updateUserAratar);

module.exports = router;
