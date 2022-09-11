const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAratar,
  getThisUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getThisUser);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAratar);

module.exports = router;
