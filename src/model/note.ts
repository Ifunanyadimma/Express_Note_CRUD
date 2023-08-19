import { DataTypes, Model } from "sequelize";
import {db} from "../config/db.config";


export interface NoteAttributes {
  id: string;
  Title: string;
  description: string;
  DueDate: string;
  status: string;
  userId: string;
}
export class Note extends Model<NoteAttributes> {}
Note.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DueDate: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "note",
  }
);
