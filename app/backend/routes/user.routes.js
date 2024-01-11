const express = require('express')
const { signUp, login, getUsers, updateRole, getStudents, getUserOfSpecificRole } = require('../controllers/user.controller')
const {customRoles, isLoggedIn} = require('../middlewares/users.middleware')
const router = express.Router()

router.route('/signup').post(signUp)
router.route('/login').post(login)
// router.route('/users').get(customRoles('admin'), getUsers)
router.route('/users').get(isLoggedIn,customRoles('admin','teacher'),getUsers)
router.route('/update').put(isLoggedIn,customRoles('admin','teacher'),updateRole)
router.route('/roles/:role').get(getUserOfSpecificRole)
module.exports = router