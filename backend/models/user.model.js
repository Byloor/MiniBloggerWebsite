import { model, Schema } from "mongoose";

const schema = new Schema({
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
schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const User = model(
    "User",
    schema
);

export default User;