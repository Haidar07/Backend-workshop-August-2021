// Import Packages from node_modules
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
var session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);

// Import packages from routes and utilities
const userRouter = require("./routes/users");
const hobbyRouter = require("./routes/hobbies") 
const db = require('./utilities/database');
const initPassport = require('./utilities/passport-config');

// Import the databases from models
const Hobby = require("./models/hobbies");
const User = require("./models/user");
const { POINT_CONVERSION_HYBRID } = require("constants");

// Define Instances of the Imported clasess
const app = express();
initPassport(passport);

const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// connect to the database 
(async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()


app.use( session({
    secret: "Anything",
    store: new SequelizeStore({
      db: db,
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
    saveUninitialized: true
  })
);

app.use((req,res,next)=>{
  if(!req.session.user){
    return next();
  }
    User.findOne({where: {id: req.session.user.id}})
    .then((user)=> {
      req.user = user;
      next()})
    .catch(err => console.log(err)) 
} )

app.use(userRouter);
app.use(hobbyRouter);

Hobby.belongsTo(User);
User.hasMany(Hobby);


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); 
});


// To make sure that the database is synchronized with the code: 
db.sync().then(()=> {
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)})
})
.catch( err => console.log(err) )
