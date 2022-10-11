import { url } from "../db.config.js";
import User from "./user.model.js"
import Blog from "./blog.model.js"
import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.user = User;
db.blog = Blog;

export default db;