"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { User } from "../model/users";
const router = express_1.default.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.json({ msg: "from get request" });
});
router.post("/", function (req, res, next) {
    res.send("from get post");
});
router.put("/", function (req, res, next) {
    res.send("from get put");
});
router.delete("/", function (req, res, next) {
    res.send("from get delete");
});
exports.default = router;
