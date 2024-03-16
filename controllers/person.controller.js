import { Sequelize } from "sequelize";

import Person from "../models/person.model.js";
import { formatMoney, sendError, validateRequest } from "../lib/utils.js";
import sequelize from "../models/db.js";
import { getAbsenteeismRate } from "../functions/query.js";

// Create and save a new Personne
export const createPerson = async (req, res) => {
  if (!validateRequest(req, res)) return;

  try {
    const personne = await Person.create(req.body);
    res.redirect("/");
  } catch (err) {
    sendError(res, err, 500, "Some error occurred while creating the Person.");
  }
};

export const handleEditPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByPk(id);
    res.render("edit", { person });
  } catch (error) {
    console.error("Error fetching person details for edit:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

export const handleSubmitEditPerson = async (req, res) => {
  try {
    const {
      personId,
      nom: newName,
      emai: newEmail,
      phone: newPhone,
      nni: newNni,
      salary: newSalary,
      department: newDepartment,
      nbPres: NewNbPres,
      nbAbs: NewNbAbs,
    } = req.body;

    console.log(req.body);

    const result = await Person.update(
      {
        nom: newName,
        email: newEmail,
        phone: newPhone,
        nni: newNni,
        salary: parseFloat(newSalary),
        department: newDepartment,
        nbPres: parseInt(NewNbPres),
        nbAbs: parseInt(NewNbAbs),
      },
      {
        where: { id: parseInt(personId) },
      }
    );



    // Redirect to the home page after editing the person
    res.redirect("/");
  } catch (error) {
    console.error("Error updating person:", error.message);
    sendError(res, error, 500, "Failed to update person.");
  }
};



// Retrieve all Personnes from the database (with condition).
export const findAllPeople = async (req, res) => {
  const nom = req.query.nom;
  const whereClause = nom ? { nom: { [Sequelize.Op.like]: `%${nom}%` } } : {};

  try {
    const [
      personnes,
      totalUsers,
      totalSalaries,
      averageSalary,
      // absenteismRate,
    ] = await Promise.all([
      Person.findAll({ where: whereClause }),
      Person.count(),
      Person.findOne({
        attributes: [
          [sequelize.fn("SUM", sequelize.col("salary")), "totalSalary"],
        ],
      }),
      Person.findOne({
        attributes: [
          [sequelize.fn("AVG", sequelize.col("salary")), "averageSalary"],
        ],
      }),
    ]);

    const absenteeismRate = await getAbsenteeismRate();

    res.render("index", {
      data: personnes,
      totalUsers,
      totalSalaries: formatMoney(totalSalaries.dataValues.totalSalary),
      averageSalary: formatMoney(averageSalary.dataValues.averageSalary),
      absenteeismRate: absenteeismRate.toFixed(2) + "%",
    });
  } catch (error) {
    sendError(
      res,
      error,
      500,
      "Some error occurred while retrieving personnes."
    );
  }
};

//check if email or nni already exists
export const checkIfEmailOrNniExists = async (req, res) => {
  const { email, nni } = req.query;
  try {
    const person = await Person.findOne({
      where: {
        [Sequelize.Op.or]: [{ email }, { nni }],
      },
    });
    res.send({ exists: !!person });
  }
  catch (error) {
    sendError(res, error, 500, "Some error occurred while checking if email or nni exists.");
  }
};

// Get total users (using a more concise approach with Sequelize's count())
export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await Person.count();
    res.send({ totalUsers });
  } catch (err) {
    sendError(
      res,
      err,
      500,
      "Some error occurred while getting total users count."
    );
  }
};

// Get total salaries (deduplicated using Person.sum('salary'))
export const getTotalSalaries = async (req, res) => {
  try {
    const totalSalaries = await Person.sum("salary");
    res.send({ totalSalaries });
  } catch (err) {
    sendError(
      res,
      err,
      500,
      "Some error occurred while getting total salaries count."
    );
  }
};

// Find a single Personne by Id
export const findOne = async (req, res) => {
  try {
    const personne = await Person.findByPk(req.params.id);
    if (!personne) {
      return sendError(
        res,
        null,
        404,
        `Not found Personne with id ${req.params.id}.`
      );
    }
    res.send(personne);
  } catch (err) {
    sendError(res, err);
  }
};

// Update a Personne identified by the id in the request
export const updateOne = async (req, res) => {
  if (!validateRequest(req, res)) return;

  try {
    const [count] = await Person.update(req.body, {
      where: { id: req.params.id },
    });
    if (count === 0) {
      return sendError(
        res,
        null,
        404,
        `Not found Personne with id ${req.params.id}.`
      );
    }
    res.send({ message: "Personne updated successfully!" });
  } catch (err) {
    sendError(res, err);
  }
};

// Delete a Personne with the specified id in the request
export const deleteOne = async (req, res) => {
  try {
    const deletedPersonne = await Person.destroy({
      where: { id: req.body.personId },
    });

    if (!deletedPersonne) {
      return sendError(
        res,
        null,
        404,
        `Not found Personne with id ${req.params.id}.`
      );
    }

    res.redirect("/");
  } catch (err) {
    sendError(res, err);
  }
};
