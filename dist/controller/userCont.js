"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.getUser = exports.postUser = void 0;
const uuid_1 = require("uuid");
const user_1 = require("../model/user");
// CREATE USER
async function postUser(req, res, next) {
    const newId = (0, uuid_1.v4)();
    const { fullname, email, gender, phone, address } = req.body;
    const find_user = await user_1.User.findOne({ where: { email: email } });
    if (find_user) {
        return res.status(404).json({
            message: "User already exist in database",
        });
    }
    const newUser = (await user_1.User.create({
        id: newId,
        fullname,
        email,
        gender,
        phone,
        address,
    }));
    console.log(newUser);
    res.status(201).json({
        data: newUser,
    });
}
exports.postUser = postUser;
// GET USER
async function getUser(req, res, next) {
    // Find all users
    const users = await user_1.User.findAll();
    users.every((user) => user instanceof user_1.User); // true
    if (users) {
        return res.status(200).json({
            message: users,
        });
    }
    return res.status(404).json({
        message: "No database exist",
    });
}
exports.getUser = getUser;
// UPDATE USER
async function putUser(req, res, next) {
    // Update by Id
    const newId = (0, uuid_1.v4)();
    const { id } = req.params;
    const { fullname, gender, phone, address } = req.body;
    //validate with joi
    const up_date = await user_1.User.findOne({ where: { id: newId } });
    if (up_date) {
        const validateRec = up_date?.update({ fullname, gender, phone, address }, { where: { id: newId } });
        if (!validateRec) {
            return res.status(400).json({ message: "No database to work on" });
        }
    }
    const result = await user_1.User.findOne({ where: { id: newId } });
    return res.status(200).json({
        message: "successful",
        result
    });
}
exports.putUser = putUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await user_1.User.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({ error: "Cannot find existing user" });
        }
        await record.destroy();
        return res.status(204).json({ msg: "User deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};
exports.deleteUser = deleteUser;
