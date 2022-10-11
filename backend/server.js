import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';


import db from "./models/index.js";
import router from "./routes.js";
import mockHelper from "./createmocks.js"
const User = db.user;

const Blog = db.blog;

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('', router);

db.mongoose
    .connect(`${db.url}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


app.get('/blogs', (req, res) => {
    res.send(blogs)
});

function initial() {
    // User.findOne({
    //     username: "Vaishali"
    // }).exec((err, user) => {
    //     if (!err && !user) {
    //         const user = new User({
    //             username: "Vaishali",
    //             //email: "byloorvaishali@gmail.com",
    //             password: bcrypt.hashSync("test", 8),
    //             description: "Passionate Mini-Blogger"
    //         });
    //         user.save();
    //     }
    //     return;
    // });
    mockHelper.createUsers()
}


app.listen(port, () => console.log("Server running"))