//file này là file chính quản lý các route
import { Express } from "express";
import authRouter from "./auth";
import penRouter from "./pen";
import girdRouter from "./grid"
import collectionRouter from "./collection";
import userRouter from "./user";
import pinRouter from "./pin";

// vậy nếu muốn gọi đến API của authRouter thì cần gọi đến http://localhost:3000/auth/...
function route(app) {
    app.use("/auth", authRouter);
    app.use("/pen", penRouter);
    app.use("/grid", girdRouter);
    app.use("/user", userRouter);
    app.use("/your-work", collectionRouter);
    app.use("/pin", pinRouter)
}

module.exports = route;


