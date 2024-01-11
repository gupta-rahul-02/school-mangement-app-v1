const express = require('express')
const { addAttenndance, getAttendanceOfUser } = require('../controllers/attendance.controller')
const { isLoggedIn, customRoles } = require('../middlewares/users.middleware')
const router = express.Router()

router.route('/mark/:email/:status').post(isLoggedIn,customRoles('admin','teacher'),addAttenndance)
router.route('/get').get(getAttendanceOfUser)

module.exports = router