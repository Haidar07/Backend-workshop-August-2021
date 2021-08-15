const express = require("express");
const router = new express.Router();
const usersControllers = require("../controllers/controllers");
const passport = require("passport");


router.get("/", usersControllers.getUsers);

router.get("/add-user", usersControllers.getAddUser);

router.post("/anything", usersControllers.postAddUser);

router.post("/sign-up", usersControllers.postSignUp); 

router.post("/sign-in", passport.authenticate('local',{failureRedirect: "/sign-up", session: false }), (req, res)=> {
    res.send(req.user);
});

// export the router object to have access to it from wherever you need to import it. 
module.exports = router;
