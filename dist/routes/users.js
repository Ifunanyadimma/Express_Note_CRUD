"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.post("/create", userController_1.signup);
router.post("/login", userController_1.Login);
router.get("/read", userController_1.get_users);
router.put("/update/:id", userController_1.update_User);
router.delete("/delete/:id", userController_1.delete_User);
router.get("/users/:id", userController_1.get_User);
router.get("/logout", userController_1.Logout);
exports.default = router;
