import { model, Schema } from "mongoose";

const schema = new Schema({
    userid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: "anonymous",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
    //images: Array,
}, { timestamps: true })

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Blog = model(
    "Blog",
    schema
);

export default Blog;