const router = require("express").Router();
const passport = require("passport");
const userController =require("../controllers/userController")
router.get("/login/success",userController.login);

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	// res.send({ status: "success", message: "added successfully" });
	setTimeout(() => {
		res.redirect(process.env.CLIENT_URL);	
	},1000)
	
});

module.exports = router;
