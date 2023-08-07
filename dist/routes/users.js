"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
// import { User } from "../model/users";
const router = express_1.default.Router();
router.post("/post", controller_1.postUser);
router.get("/get", controller_1.getUser);
router.put("/put", controller_1.putUser);
router.delete("");
exports.default = router;
