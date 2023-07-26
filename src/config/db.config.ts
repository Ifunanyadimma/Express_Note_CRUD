import {Sequelize} from "sequelize";

const db = new Sequelize("app_db", "ifuu", "test", {
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
})

export default db;