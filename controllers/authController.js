const argon = require("argon2")
const User = require("../models/User")
const jwt = require("jsonwebtoken")


const UserRegister = async (req, res) => {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.json({ message: "User already exists" });
    } else {
        const hashed_password = await argon.hash(password)
        const newUser = new User({
            email,
            name,
            password: hashed_password,
        });
        newUser.save();
        jwt.sign({email, name}, "secret", (err, token) => {
            if (err) console.log(err);
            else return res.json({ token: token });
        });
        
    }
}

const UserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User doesn't exist" });
    } else {
        const verify_password = await argon.verify(user.password, password)
        if (!verify_password) {
            return res.json({ message: "Password Incorrect" });
        }
        const payload = {
            email,
            name: user.name
        };
        jwt.sign(payload, "secret", (err, token) => {
            if (err) console.log(err);
            else return res.json({ token: token });
        });
    }
}
module.exports = {
    UserRegister,
    UserLogin
}