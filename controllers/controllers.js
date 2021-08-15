const User = require("../models/models");
// const path = require("path")

exports.getUsers = async (req, res, next) => {
  const users = await User.findAll()
  res.send(users); 
  }

exports.getAddUser = (req, res, next) => {
 res.status(201).json("add-user.ejs");
};

exports.postAddUser = (req, res, next) => {
  console.log(req.body);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password; 
  const user = new User(null, firstname,lastname, email, password);
  user.save();
  console.log(user);
  res.redirect("/"); }

exports.postSignUp = async (req, res, next) => {
  console.log(req.body);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password; 
  const user = User.build({firstname, lastname, email, password});
  console.log(user.firstname)
  try{
    await user.save()
    res.send(user)
  }catch(err){
    res.status(400).send(err)
  }
}; 

// exports.postSignIn = async (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const user = await User.findOne({where: {email} });
//   if (user?.password === password){
//     res.send(user)
//   }else{
//     res.status(400).send("Password or username is incorrect")
//   }}
