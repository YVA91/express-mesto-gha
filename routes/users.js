const router = require('express').Router();
const {
  getUser,
  getUserById,
  createUsers,
  updateUserInfo,
  updateUserAratar,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/:userId', getUserById);
router.post('/users', createUsers);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAratar);

module.exports = router;
