import { NextFunction, Request, Response, response } from "express";
import { v4 as UUIDV4 } from "uuid";
import { User, UserAttributes } from "../model/user";
import { promises } from "dns";

// CREATE USER
export async function postUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newId = UUIDV4();
  const { fullname, email, gender, phone, address } = req.body;
  const find_user = await User.findOne({ where: { email: email } });
  if (find_user) {
    return res.status(404).json({
      message: "User already exist in database",
    });
  }

  const newUser = (await User.create({
    id: newId,
    fullname,
    email,
    gender,
    phone,
    address,
  })) as unknown as UserAttributes;
  console.log(newUser);
  res.status(201).json({
    data: newUser,
  });
}

// GET USER
export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
) {

  // Find all users
  const users = await User.findAll();
  users.every((user) => user instanceof User); // true
  if (users) {
    return res.status(200).json({
      message: users,
    });
  }
  return res.status(404).json({
    message: "No database exist",
  });
}

// UPDATE USER
export async function putUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {

  // Update by Id
  const newId = UUIDV4();
  const { id } = req.params;
  const { fullname, gender, phone, address } = req.body;

  //validate with joi

  const up_date = await User.findOne({ where: { id: newId } });
  if (up_date) {
    const validateRec = up_date?.update(
      { fullname, gender, phone, address },
      { where: { id: newId } }
    );

    if (!validateRec) {
      return res.status(400).json({ message: "No database to work on" });
    }
  }

  const result = await User.findOne({where: {id:newId}});
  return res.status(400).json({
    message: "successful",
    result
  });
}