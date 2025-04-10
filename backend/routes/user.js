const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {getAllArtists, getUpdateStatus} = require('../controllers/usersController')

const router = express.Router();


router.route("/getallArtists").get(isAuthenticatedUser, getAllArtists)
router.route("/update-artists").post(getUpdateStatus)


module.exports = router