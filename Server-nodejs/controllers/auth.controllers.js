const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/users.model")

const login = async (req, res)=>{
    const {email: login, password} = req.body;
    const user = await User.findOne({email: login})
    if(!user) return res.status(404).send({message: "email/password incorrect"});
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) return res.status(404).send({message: "email/password incorrect"});

    const {password: hashedPassword, username, email, _id, ...userInfo} = user.toJSON();
    const token = jwt.sign({username, email, _id}, process.env.JWT_SECRET)

    res.send({
        token,
        user: userInfo
    })

}

const register = async (req, res) => {
    try {
        const {username,email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            ...req.body,
            password: hashedPassword
        });

        await user.save();

        const tokenPayload = {
            _id: user._id,
            username,
            email
          };
          const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

        res.status(201).json({ message: "User registered successfully", "token" : token});
    } catch (error) {
        res.status(500).json({ 
            error: error.message,});
    }
};

const verify = (_, res)=>{
    res.send("Verfied")
}

module.exports = {login, register, verify}