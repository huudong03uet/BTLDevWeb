//file này là file chính quản lý các route
import { Express } from "express";
import authRouter from "./auth";
import penRouter from "./pen";
import collectionRouter from "./collection";
//import userRoute from "./user";

// vậy nếu muốn gọi đến API của authRouter thì cần gọi đến http://localhost:3000/auth/...
function route(app) {
    app.use("/auth", authRouter);
    app.use("/pen", penRouter);
    app.use("/your-work", collectionRouter);
}

module.exports = route;


