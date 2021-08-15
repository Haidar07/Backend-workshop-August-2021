const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("./routes/routes");
const db = require('./utilities/database'); 
const passport = require("passport");
const initPassport = require('./utilities/passport-config');
initPassport(passport);

const port = 3001;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// test connection to the database 
(async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); 
});

app.use(userRouter);

// To make sure that the database is synchronized with the code: 
db.sync().then(()=> {
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)})
})
.catch( err => console.log(err) )
