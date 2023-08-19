"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.update_Note = exports.get_Note = exports.getNote = exports.postNote = void 0;
const uuid_1 = require("uuid");
const note_1 = require("../model/note");
const utils_1 = require("../utils/utils");
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, dotenv_1.config)();
const jwtsecret = process.env.JWT_SECRET;
//CREATE NOTES
const postNote = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1] || req.cookie.token;
        console.log(token);
        const verified = jsonwebtoken_1.default.verify(token, jwtsecret);
        console.log(verified);
        const id = (0, uuid_1.v4)();
        //const { title, description, duedate, status } = req.body; instead of this...
        const noteRecord = await note_1.Note.create({
            id,
            ...req.body,
            userId: verified.id
        });
        return res.status(201).json({
            msg: "Note successfully created",
            noteRecord
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "something went wrong"
        });
    }
};
exports.postNote = postNote;
// GET notes
const getNote = async (req, res, next) => {
    try {
        // Find all notes
        // sequelize, its findAll or findAndCountAll
        //Using findAll
        // const getAllnotes = await Notes.findAll();
        //   return res.status(200).json({
        //     msg: "You have successfully retrieved all data",
        //     getAllnotes
        //   })
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //Using findAllCountAll
        const getAllnotes = await note_1.Note.findAndCountAll({
            limit: limit,
            offset: offset
        });
        return res.status(200).json({
            msg: "You have successfully retrieved all data",
            count: getAllnotes.count,
            notes: getAllnotes.rows
        });
        // if (notes) {
        //   return res.status(200).json({
        //     message: notes,
        //   });
        // }
        // return res.status(404).json({
        //   message: "Notes does not exist",
        // });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "error message"
        });
    }
};
exports.getNote = getNote;
//GET NOTE
async function get_Note(req, res, next) {
    try {
        console.log(req.body.id);
        const user = await note_1.Note.findByPk(req.body.id);
        console.log({ user });
        console.log(req.body);
        return res.status(200).json({
            user,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "No note found"
        });
    }
}
exports.get_Note = get_Note;
// UPDATE NOTE
const update_Note = async (req, res, next) => {
    try {
        // const { id } = req.params;
        const id = req.params.id;
        const { title, description, duedate, status } = req.body;
        //validate with joi
        const validatedResult = utils_1.updatenoteschema.validate(req.body, utils_1.options);
        if (validatedResult.error) {
            return res.status(400).json({
                Error: validatedResult.error.details[0].message,
            });
        }
        const noteUpdate = await note_1.Note.findOne({ where: { id } });
        if (!noteUpdate) {
            res.status(400).json({
                error: "Cannot find existing note",
            });
        }
        const correct = await noteUpdate?.update({
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
        return res.status(500).json({
            msg: "something went wrong"
        });
    }
};
exports.update_Note = update_Note;
// DELETE NOTE
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const record = await note_1.Note.findOne({ where: { id } });
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
exports.deleteUser = deleteUser;
