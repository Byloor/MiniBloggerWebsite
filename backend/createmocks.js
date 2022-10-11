import db from "./models/index.js";
const User = db.user;
import bcrypt from "bcryptjs";

function createUsers() {
    const users = [
        {
            username: "Vaishali",
            //email: "byloorvaishali@gmail.com",
            password: bcrypt.hashSync("test", 8),
            description: "Passionate Mini-Blogger"
        }, {
            username: "Admin",
            //email: "admin@gmail.com",
            password: bcrypt.hashSync("admin", 8),
            description: "Admin"
        }
    ]
    for (let i = 0; i < users.length; i++) {
        User.findOne({
            username: users[i].username
        }).exec((err, user) => {
            if (!err && !user) {
                const user = new User(users[i]);
                user.save();
            }
            return;
        });
    }

}
    // const blog = new Blog({
    //     author: "Vaishali Byloor",
    //     title: "How to make paneer",
    //     tags: ["Cooking", "Personal Interest"],
    //     summary: "This is my first blog. I love cooking and am exicted to share my joy with you guys. Please read further to learn how to cook paneer (Cottage Cheese)",
    //     content: "Firstly, in a large vessel take 3-litre milk. make sure to use full cream milk to get a good amount of paneer. stir and get the milk to boil. Make sure not to burn the bottom of the vessel.add 2 tbsp vinegar and stir the milk. you can alternatively use lemon or curd in place of vinegar.milk starts to curdle, add more vinegar as required.now drain off the curdled milk over cheesecloth. whey water can be used to knead the dough for roti or use it in the soup as they are very rich in protein.now drain off the curdled milk over cheesecloth. whey water can be used to knead the dough for roti or use it in the soup as they are very rich in protein.now drain off the curdled milk over cheesecloth. whey water can be used to knead the dough for roti or use it in the soup as they are very rich in protein. Drain off the curdled milk over cheesecloth. Whey water can be used to knead the dough for roti or use it in the soup as they are very rich in protein. Rinse with cold water and squeeze off the water.shape the paneer into a block, and keep the heavy object over it.rest for 20 minutes or until the paneer sets completely.after 20 minutes, the cottage cheese has set well and ready to cut."
    // });

    // blog.save(blog)
const mockHelper = {
    createUsers
}
export default mockHelper;