"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.delete_User = exports.update_User = exports.get_User = exports.get_users = exports.Login = exports.signup = void 0;
const user_1 = require("../model/user");
const uuid_1 = require("uuid");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
const signup = async (req, res) => {
    try {
        const { fullname, email, password, confirm_password, gender, phone, address, } = req.body;
        const newId = (0, uuid_1.v4)();
        //validate with joi or zoid
        const validatedResult = utils_1.signupSchema.validate(req.body, utils_1.options);
        if (validatedResult.error) {
            return res
                .status(400)
                .json({ Error: validatedResult.error.details[0].message });
        }
        // //HASH PASSWORD
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        // //create User
        // //checking if user exist
        const user = await user_1.User.findOne({
            where: { email },
        });
        if (!user) {
            let newUser = await user_1.User.create({
                id: newId,
                fullname,
                email,
                password: passwordHash,
                gender,
                phone,
                address,
            });
            //generate token for user
            const user = (await user_1.User.findOne({
                where: { email: email },
            }));
            const { id } = user;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30mins" });
            //USE LINE WHEN ITS COOKIE INSTEAD OF AUTHORISATION HEADER IN AUTH
            //res.cookie('token', token, {httpOnly:true, maxAge:30*60*1000})
            //SEND OTP TO THE USER
            //SEND EMAIL TOO
            return res.status(201).json({
                msg: "user created successfully",
                newUser,
                token,
            });
        }
        res.status(409).json({
            error: "email already taken",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ Error: "Internal server error" });
    }
};
exports.signup = signup;
//LOGIN
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validate with joi or zoid
        const validatedResult = utils_1.loginUserSchema.validate(req.body, utils_1.options);
        if (validatedResult.error) {
            console.error(validatedResult.error.message);
            return res
                .status(400)
                .json({ Error: validatedResult.error.details[0].message });
        }
        //generate token for user
        const user = (await user_1.User.findOne({
            where: { email: email },
        }));
        const { id } = user;
        const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30d" });
        //USE LINE WHEN ITS COOKIE INSTEAD OF AUTHORISATION HEADER IN AUTH
        req.headers = { ...req.headers, authorization: `Bearer ${token}` };
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        const validUser = await bcryptjs_1.default.compare(password, user.password);
        if (validUser) {
            return res.status(200).json({
                msg: "You have successfully logged In",
                user,
                token,
            });
        }
        return res.status(400).json({ Error: "Invalid Email/Password" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ Error: "Internal server error" });
    }
};
exports.Login = Login;
// GET USERS
async function get_users(req, res, next) {
    // Find all users
    const users = await user_1.User.findAll();
    users.every((user) => user instanceof user_1.User); // true
    if (users) {
        return res.status(200).json({
            message: users,
        });
    }
    return res.status(404).json({
        message: "No user exist",
    });
}
exports.get_users = get_users;
//GET USER
async function get_User(req, res, next) {
    console.log(req.body.id);
    const user = await user_1.User.findByPk(req.body.id);
    console.log({ user });
    console.log(req.body);
    return res.status(200).json({
        user,
    });
}
exports.get_User = get_User;
// UPDATE USER
const update_User = async (req, res, next) => {
    try {
        // const { id } = req.params;
        const id = req.params.id;
        const { fullname, email, gender, phone, address } = req.body;
        //validate with joi
        const validatedResult = utils_1.updateUserSchema.validate(req.body, utils_1.options);
        if (validatedResult.error) {
            return res.status(400).json({
                Error: validatedResult.error.details[0].message,
            });
        }
        const userUpdate = await user_1.User.findOne({ where: { id } });
        if (!userUpdate) {
            res.status(400).json({
                error: "Cannot find existing note",
            });
        }
        const correct = await userUpdate?.update({
            id,
            ...req.body,
        });
        return res.status(200).json({
            msg: "You have successfully updated your results",
            correct,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.update_User = update_User;
// DELETE
const delete_User = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await user_1.User.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({ error: "Cannot find existing note" });
        }
        await record.destroy();
        return res.status(204).json({ msg: "Note deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};
exports.delete_User = delete_User;
const Logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};
exports.Logout = Logout;
