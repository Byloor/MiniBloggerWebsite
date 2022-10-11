import { model, Schema } from "mongoose";

const User = model(
    "User",
    new Schema({
        username: {
            type: String,
            required: true
        },
        // email: String,
        password: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: "New Mini-Blogger",
            required: true
        }
    })
);

export default User;