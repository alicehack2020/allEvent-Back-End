const router = require("express").Router();
const passport = require("passport");
const userController = require("../controllers/userController")
 
router.post("/login", userController.login);

module.exports = router;
