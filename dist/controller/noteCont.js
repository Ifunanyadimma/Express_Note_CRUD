"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.update_Note = exports.getNote = exports.postNote = void 0;
const uuid_1 = require("uuid");
const note_1 = require("../model/note");
// CREATE NOTE
async function postNote(req, res, next) {
    const newId = (0, uuid_1.v4)();
    const { title, description, duedate, status } = req.body;
    const find_note = await note_1.Note.findOne({ where: { id: newId } });
    if (find_note) {
        return res.status(404).json({
            message: "Note already exist in database",
        });
    }
    const newNote = (await note_1.Note.create({
        id: newId,
        Title: title,
        description: description,
        DueDate: duedate,
        status: status,
    }));
    console.log(newNote);
    res.status(201).json({
        data: newNote,
    });
}
exports.postNote = postNote;
// GET NOTE
async function getNote(req, res, next) {
    // Find all notes
    const note = await note_1.Note.findAll();
    note.every((note) => note instanceof note_1.Note); // true
    if (note) {
        return res.status(200).json({
            message: note,
        });
    }
    return res.status(404).json({
        message: "No database exist",
    });
}
exports.getNote = getNote;
// UPDATE NOTE
const update_Note = async (req, res, next) => {
    try {
        // const { id } = req.params;
        const id = req.params.id;
        const { title, description, duedate, status } = req.body;
        const noteUpdate = await note_1.Note.findOne({ where: { id } });
        //validate with joi
        //   const validatedResult = updatenoteschema.validate(req.body, options);
        //   if (!noteUpdate) {
        //     res.status(400).json({
        //       error: "Cannot find existing note",
        //     });
        //   }
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
    }
};
exports.update_Note = update_Note;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await note_1.Note.findOne({ where: { id } });
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
