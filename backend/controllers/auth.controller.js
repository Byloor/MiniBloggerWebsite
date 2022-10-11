import db from "../models/index.js";
const User = db.user;

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const register = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        description: req.body.description
    });
    user.save();
    res.send({ message: `User ${user.username} was registered successfully!` });
};

const login = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {

            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id, username: req.body.username }, "Super_secret_key");

            res.status(200).send({
                id: user._id,
                username: user.username,
                //email: user.email,
                description: user.description,
                token: token
            });
        });
};
const authcontroller = {
    login, register
}
export default authcontroller;