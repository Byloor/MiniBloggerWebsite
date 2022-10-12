import authcontroller from './controllers/auth.controller.js';
import blogcontroller from './controllers/blogactions.controller.js';
import verifyService from "./VerifyService.js";
import express from "express";

const app = express.Router();

app.post(
    "/register",
    [verifyService.checkIfEmailAlreadyRegistered],
    authcontroller.register
);

app.post("/login", authcontroller.login);

app.get("/blogs", blogcontroller.getAll);

app.get("/blog/:id", blogcontroller.getBlogById);
app.get("/blogs/:userid", blogcontroller.getAll);
app.post("/blogs", blogcontroller.create);
app.delete("/blogs", [verifyService.isUserAdmin], blogcontroller.deleteAll);
app.delete("/blog/:id", blogcontroller.deleteBlogById);
app.put("/blog/:id", blogcontroller.updateBlogById);
app.delete("/blogs/:userid", blogcontroller.deleteAll);

const router = app;
export default router;