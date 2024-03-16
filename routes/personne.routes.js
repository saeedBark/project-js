import express from "express";
import {
  createPerson,
  findOne,
  findAllPeople,
  getTotalUsers,
  getTotalSalaries,
  updateOne,
  deleteOne,
} from "../controllers/person.controller.js";

const personRouter = express.Router();
const API_ENDPOINT = "/api/personnes";

// Get all people
personRouter.get("/", findAllPeople);

// Delete all people
// personRouter.delete(API_ENDPOINT, deleteAll);

// Retrieve a single Person with id
personRouter.get(`${API_ENDPOINT}/:id`, findOne);

// Update a Person with id
personRouter.put(`${API_ENDPOINT}/:id`, updateOne);

// Delete a Person with id
personRouter.delete(`${API_ENDPOINT}/:id`, deleteOne);

// Show the form for adding a new person
personRouter.get("/add-person", (req, res) => {
  res.render("addNew");
});

// Add a new person
personRouter.post(`${API_ENDPOINT}/add-person`, createPerson);

// Retrieve all Users
personRouter.get(`${API_ENDPOINT}/totalUsers`, getTotalUsers);

// Retrieve all Salaries
personRouter.get(`${API_ENDPOINT}/totalSalaries`, getTotalSalaries);

export default personRouter;
