const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getThisUser,
} = require('../controllers/users');
const {
  validationGetUserById,
  validationUpdateUserInfo,
  validationUpdateUserAvatar,
} = require('../validation/validation');

router.get('/users', getUsers);
router.get('/users/me', getThisUser);
router.get('/users/:userId', validationGetUserById, getUserById);
router.patch('/users/me', validationUpdateUserInfo, updateUserInfo);
router.patch('/users/me/avatar', validationUpdateUserAvatar, updateUserAvatar);

module.exports = router;
