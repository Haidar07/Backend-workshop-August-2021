
exports.postAddHobby = (req, res, next) => {
    console.log(req.user);
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const description = req.body.description; 

    req.user.createHobby({title, imgUrl, description})
    .then((results) => res.send("Hobby is created"))
    .catch(err => console.log(err));


    res.json({user});
}

exports.getHobby = (req, res, next) => {
    req.user
        .getHobbies()
        .then(results => res.send(results))
        .catch(err => console.log(err)) 
}

