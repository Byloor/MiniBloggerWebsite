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
app.post("/blogs", blogcontroller.create);
app.delete("/blogs", [verifyService.isUserAdmin], blogcontroller.DelAllByAdmin);

const router = app;
export default router;