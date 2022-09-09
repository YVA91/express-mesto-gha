const router = require('express').Router();
const {
  getUser,
  getUserById,
  updateUserInfo,
  updateUserAratar,
  login,
  createUsers,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAratar);
router.post('/signin', login);
router.post('/signup', createUsers); 


module.exports = router;
