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
const database_url=process.env.DATABASE_URL;
//database connection
connectDb(database_url)
// app.use(cors())

app.use(bodyParser.json());

//events


app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);



app.use("/auth", authRoute);
app.use('/api/event', eventRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
