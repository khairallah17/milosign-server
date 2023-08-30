const express = require('express')
const router = express.Router()
const { googleAuth } = require("../controllers/controller.auth")

router.use("/login", googleAuth)
router.use("/users", )

module.exports = router