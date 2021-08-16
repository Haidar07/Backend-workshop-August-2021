const express = require("express");
const router = new express.Router();
const hobbiesControllers = require("../controllers/hobbies");

router.post('/add-hobby', hobbiesControllers.postAddHobby)
router.get('/get-hobby', hobbiesControllers.getHobby)

module.exports = router;