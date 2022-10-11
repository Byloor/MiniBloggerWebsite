import db from "./models/index.js";

const User = db.user;

const checkIfEmailAlreadyRegistered = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Oops! Name is already Registered, Please Login" });
            return;
        }
        next();
    });
};


const isUserAdmin = (req, res, next) => {
    User.find({
        username: "Admin"
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) next();

        return;
    });
};
const verifyService = {
    isUserAdmin,
    checkIfEmailAlreadyRegistered
}
export default verifyService;
