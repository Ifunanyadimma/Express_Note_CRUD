import express, { Request, Response, NextFunction } from "express";
import { postUser, getUser, putUser } from "../controller";
import { Note } from "../model/note";
// import { User } from "../model/users";


const router = express.Router();

router.post("/post", postUser);
router.get("/get", getUser);
router.put("/put", putUser)
router.delete("")

export default router;