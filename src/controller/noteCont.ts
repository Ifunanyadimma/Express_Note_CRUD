import { NextFunction, Request, Response} from "express";
import { v4 as UUIDV4 } from "uuid";
import { Note, NoteAttributes } from "../model/note";
import { promises } from "dns";
import { getTsBuildInfoEmitOutputFilePath } from "typescript";

// CREATE NOTE
export async function postNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newId = UUIDV4();
  const {title, description,duedate,status} = req.body;

  const find_note = await Note.findOne({ where: { id: newId } });
  if (find_note) {
    return res.status(404).json({
      message: "Note already exist in database",
    });
  }

  const newNote = (await Note.create({
    id: newId,
    Title: title,
    description: description,
    DueDate: duedate,
    status: status,
  })) as unknown as NoteAttributes;
  console.log(newNote);
  res.status(201).json({
    data: newNote,
  });
}

// GET NOTE
export async function getNote(
  req: Request,
  res: Response,
  next: NextFunction
) {

  // Find all notes
  const note = await Note.findAll();
note.every((note) => note instanceof Note); // true
  if (note) {
    return res.status(200).json({
      message: note,
    });
  }
  return res.status(404).json({
    message: "No database exist",
  });
}

// UPDATE NOTE
export const update_Note = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
  
      // const { id } = req.params;
  
      const id = req.params.id;
      const { title, description, duedate, status } = req.body;
      const noteUpdate = await Note.findOne({ where: { id } });
  
  
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
    } catch (error) {
      console.log(error);
    }
  
  };


export const deleteUser = async (req: Request, res: Response) => {
try {
const { id } = req.params;
const record = await Note.findOne({ where: { id } });

if (!record) {
return res.status(404).json({ error: "Cannot find existing user" });
      }
await record.destroy();
return res.status(204).json({ msg: "User deleted successfully" });
    } catch (error) {
      console.error(error);
return res.status(500).json({ error: "Something went wrong" });
    }
  };
