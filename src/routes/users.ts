import express, { Request, Response, NextFunction } from "express";
import { Note } from "../model/note";
// import { User } from "../model/users";


const router = express.Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.json({ msg: "from get request" });
});
router.post("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("from get post");
});
router.put("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("from get put");
});
router.delete("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("from get delete");
});

export default router;