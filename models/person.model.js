import { Sequelize } from "sequelize";
import sequelize from "./db.js";

const Person = sequelize.define(
  "Person",
  {
    nom: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Enforces unique email addresses
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nni: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Enforces unique national identity numbers
    },
    salary: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    department: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nbPres: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Default to 0 absences
    },
    nbAbs: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Default to 0 absences
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

export default Person;
