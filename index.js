require("dotenv").config();
const express = require("express");
var cors = require('cors')
const passport = require("passport");

const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const connectDb = require('./config/connectdb');
const bodyParser = require('body-parser');

const authRoute = require("./routes/auth");
const eventRoutes = require("./routes/eventRoutes") 
const urlInfo=require("./config/constants")
const app = express();
require("./passport")
const database_url=process.env.DATABASE_URL;
//database connection
connectDb(database_url)
 

app.use(bodyParser.json());

// app.use(cors({
// 	origin: ['https://alleventsio.netlify.app',urlInfo.SERVER_URL,urlInfo.Login_URL_ISSUE],
// 	methods: ['GET', 'POST', 'PUT', 'DELETE'],
// 	allowedHeaders: ['Content-Type', 'Authorization'],
// 	credentials: true // Set this to 'true' to allow credentials
// }));

app.use(cors({
	origin: '*', // or specify specific origins
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true // Set this to 'true' to allow credentials
  }));


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
 
 

//user
app.use("/auth", authRoute);

//events
app.use('/api/event', eventRoutes)

 

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
