import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";

// const connection = mysql2.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   port: dbConfig.PORT,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
// });

const sequelize = new Sequelize({
  dialect: "mysql",
  host: dbConfig.HOST,
  username: dbConfig.USER,
  port: dbConfig.PORT,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

export default sequelize;
