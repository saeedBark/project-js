import express from "express";
import {
  createPerson,
  findOne,
  findAllPeople,
  getTotalUsers,
  getTotalSalaries,
  updateOne,
  deleteOne,
  handleEditPerson,
  handleSubmitEditPerson,
  checkIfEmailOrNniExists,
} from "../controllers/person.controller.js";
import Person from "../models/person.model.js";

const personRouter = express.Router();
const API_ENDPOINT = "/api/personnes";

// Get all people
personRouter.get("/", findAllPeople);

personRouter.get("/edit-person/:id", handleEditPerson);

// Delete all people
// personRouter.delete(API_ENDPOINT, deleteAll);

// Retrieve a single Person with id
personRouter.get(`${API_ENDPOINT}/:id`, findOne);

// Check if email or nni already exists
personRouter.post(`${API_ENDPOINT}/check-email-or-nni`, checkIfEmailOrNniExists);

// Update a Person with id
personRouter.put(`${API_ENDPOINT}/:id`, updateOne);

// Delete a Person with id
personRouter.post(`${API_ENDPOINT}/delete-person`, deleteOne);

// Show the form for adding a new person
personRouter.get("/add-person", (req, res) => {
  res.render("addNew");
});

// Route for handling form submission (editing a person)
personRouter.post(`${API_ENDPOINT}/edit-person`, handleSubmitEditPerson);

// Add a new person
personRouter.post(`${API_ENDPOINT}/add-person`, createPerson);

// Retrieve all Users
personRouter.get(`${API_ENDPOINT}/totalUsers`, getTotalUsers);

// Retrieve all Salaries
personRouter.get(`${API_ENDPOINT}/totalSalaries`, getTotalSalaries);

export default personRouter;
