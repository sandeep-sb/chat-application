const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const {username, password, email} = req.body;
        const userCheck = await User.findOne({username});
        if(userCheck){
            return res.json({msg : "User already exists", status: false});
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.json({msg: "Email already exists", status: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username, 
            email,
            password: hashedPassword 
        });
        // deleting the password from user object sent to frontend 
        // to be stored in local storage
        delete user.password;
        return res.json({status: true, user});
    } catch (error) {
        next(error);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        console.log(req.body);
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            console.log("user");
            return res.json({msg : "Incorrect Username or password", status: false});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            console.log("pass");
            return res.json({msg : "Incorrect Username or password", status: false});
        }
        // deleting the password from user object sent to frontend 
        // to be stored in local storage
        delete user.password;

        return res.json({status: true, user});

    } catch (error) {
        next(error);
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const avatarImage = req.body.image;
        const user = await User.findByIdAndUpdate(userID, {
            isAvatarImageStored: true,
            avatarImage: avatarImage
        });
        return res.json({isSet: user.isAvatarImageStored, image: user.avatarImage})

    } catch (error) {
        next(error);
    }
}