import express from "express";
import { postNote, getNote, deleteUser, update_Note} from  "../controller/noteController"
//import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/create", postNote);
router.get("/", getNote);
router.put('/update/:id',update_Note);
router.delete('/delete/:id',deleteUser);
//router.get("/notes/id", get_Note);


export default router;