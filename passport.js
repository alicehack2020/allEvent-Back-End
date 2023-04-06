const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

// Configure Google OAuth 2.0 strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "https://alleventbackendupdated.onrender.com/auth/google/callback", // Update with your HTTPS redirect URI
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			// Handle authentication logic here
			// ...
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
