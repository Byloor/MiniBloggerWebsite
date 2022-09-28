import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
// import { allowedNodeEnvironmentFlags } from 'process';
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;
const blogs = [{
    user: "Vaishali",
    description: "Passionate Blogger",
    details: {
        "author": "Vaishali Byloor",
        "title": "How to make paneer",
        "tags": ["Cooking", "Personal Interest"],
        "summary": "This is my first blog. I love cooking and am exicted to share my joy with you guys. Please read further to learn how to cook paneer (Cottage Cheese)",
        "content": "Firstly, in a large vessel take 3-litre milk. make sure to use full cream milk to get a good amount of paneer. stir and get the milk to boil. Make sure not to burn the bottom of the vessel.add 2 tbsp vinegar and stir the milk. you can alternatively use lemon or curd in place of vinegar.milk starts to curdle, add more vinegar as required.now drain off the curdled milk over cheesecloth. whey water can be used to knead the dough for roti or use it in the soup as they are very rich in protein.now drain off the curdled milk over cheesecloth. whey water can be used to knead the dough for roti or use it in the soup as they are very rich in protein.now drain off the curdled milk over cheesecloth. whey water can be used to knead the dough for roti or use it in the soup as they are very rich in protein. Drain off the curdled milk over cheesecloth. Whey water can be used to knead the dough for roti or use it in the soup as they are very rich in protein. Rinse with cold water and squeeze off the water.shape the paneer into a block, and keep the heavy object over it.rest for 20 minutes or until the paneer sets completely.after 20 minutes, the cottage cheese has set well and ready to cut."
    }

}, {
    user: "Vaishali",
    description: "Passionate Blogger",
    details: {
        author: "Vaishali Byloor",
        title: "About Lorem Ipsum",
        tags: ["Other", "Personal Interest"],
        summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
}]
const users = [{
    name: "Vaishali",
    password: "test",
    description: "Passionate Blogger",
}]

app.use(cors());
app.use(bodyParser.json());

app.get('/blogs', (req, res) => {
    res.send(blogs)
});

// no error handling
app.post('/blogs', (req, res) => {
    const token = req.header('Authorization');
    const { userId, userName } = jwt.decode(token, '123');
    const user = users[userId];
    let newBlog = { user: user.name, user: user.description, details: req.body.blog }
    blogs.push(newBlog)
    res.json(newBlog)
});

app.get('/blogs/:id', (req, res) => {
    res.send(blogs[req.params.id])
});

app.post('/register', (req, res) => {
    let registerData = req.body;
    let newIndex = users.push(registerData);
    let userId = newIndex - 1;

    let token = jwt.sign({ userId, userName: registerData.name }, '123');
    const result = {
        token,
        userName: registerData.name,
        description: registerData.description
    }
    res.json(result);
});


app.post('/login', (req, res) => {
    let loginData = req.body;
    let userId = users.findIndex(user => user.name == loginData.name);
    let user = users.find(user => user.name == loginData.name);

    console.log(loginData, userId, user);
    if (userId == '-1' || users[userId]?.password !== loginData.password) {
        return res.status(401).send({ message: "Login Data is invalid" })
    }

    let result = {
        token: jwt.sign({ userId, userName: user.name }, '123'),
        userName: loginData.name,
        description: user.description
    };
    res.json(result);
});

app.listen(port, () => console.log("Server running"))