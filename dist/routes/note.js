"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controller/noteController");
//import { auth } from "../middleware/auth";
const router = express_1.default.Router();
router.post("/create", noteController_1.postNote);
router.get("/", noteController_1.getNote);
router.put('/update/:id', noteController_1.update_Note);
router.delete('/delete/:id', noteController_1.deleteUser);
//router.get("/notes/id", get_Note);
exports.default = router;
