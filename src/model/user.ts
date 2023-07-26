import { DataTypes, Model } from "sequelize";

import db from "../config/db.config";

export interface UserAttributes {
  id: string;
  fullname: string;

  email: string;

  gender: string;

  phone: string;

  address: string;

}

export class User extends Model<UserAttributes> {

  static Update() {

    throw new Error("Method not implemented.");

  }

}


User.init(

  {

    id: {

      type: DataTypes.UUIDV4,

      primaryKey: true,

      allowNull: false,

    },

    fullname: {

      type: DataTypes.STRING,

      unique: true,

    },

    email: {

      type: DataTypes.STRING,

      unique: true,

      allowNull: false,

    },

    gender: {

      type: DataTypes.STRING,

      allowNull: false,

    },

    phone: {

      type: DataTypes.STRING,

      allowNull: false,

    },

    address: {

      type: DataTypes.STRING,

      allowNull: false,

    },

  },

  {

    sequelize: db,

    tableName: "User",

  }

);