require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");

const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const connectDb = require('./config/connectdb');
const bodyParser = require('body-parser');

const authRoute = require("./routes/auth");
const eventRoutes = require("./routes/eventRoutes") 

const app = express();
require("./passport")
const database_url=process.env.DATABASE_URL;
//database connection
connectDb(database_url)
 

app.use(bodyParser.json());




app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());
//cors
app.use(
	cors({
		origin: [process.env.CLIENT_URL,'http://localhost:8080','http://localhost:3000'],
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


//user
app.use("/auth", authRoute);
//events
app.use('/api/event', eventRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
