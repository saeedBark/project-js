import express from "express";
import personRoutes from "./routes/personne.routes.js";
import sequelize from "./models/db.js";
import { getAbsenteeismRate } from "./functions/query.js";

const app = express();

const PORT = 3000;

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", personRoutes);

// app.get("/", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "http://localhost:8080/api/personnes/personnes"
//     );
//     const data = response.data;
//     res.render("index", { data });
//   } catch (error) {
//     console.error("Error fetching data from the API:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/add-person", async (req, res) => {
//   try {
//     res.render("addNew");
//   } catch (error) {
//     console.error("Error fetching data from the API:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });
// // New route for handling form submission
// app.post("/add-person", async (req, res) => {
//   try {
//     const { nom, email, phone, nni, salary, department, nbPres, nbAbs } =
//       req.body;

//     // You can use axios or any other method to add the new person to your API
//     // Example using axios:
//     await axios.post("http://localhost:8080/api/personnes/add-person", {
//       nom: nom,
//       email: email,
//       phone: parseInt(phone),
//       nni: parseInt(nni),
//       salary: parseInt(salary),
//       department: department,
//       nbPres: parseInt(nbPres),
//       nbAbs: parseInt(nbAbs),
//     });

//     // Redirect to the home page after adding the person
//     res.redirect("/");
//   } catch (error) {
//     console.error("Error adding a new person:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.post("/delete-person", async (req, res) => {
//   try {
//     const { personId } = req.body;

//     // Make a DELETE request to remove the person from your API
//     await axios.delete(`http://localhost:8080/api/personnes/${personId}`);

//     // Redirect to the home page after deleting the person
//     res.redirect("/");
//   } catch (error) {
//     console.error("Error deleting a person:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Route for handling form submission (editing a person)
// app.post("/edit-person", async (req, res) => {
//   try {
//     const {
//       personId,
//       nom,
//       email,
//       phone,
//       nni,
//       salary,
//       department,
//       nbPres,
//       nbAbs,
//     } = req.body;

//     // Make a PUT or PATCH request to update the person in your API
//     await axios.put(`http://localhost:8080/api/personnes/${personId}`, {
//       nom: nom,
//       email: email,
//       phone: parseInt(phone),
//       nni: parseInt(nni),
//       salary: parseInt(salary),
//       department: department,
//       nbPres: parseInt(nbPres),
//       nbAbs: parseInt(nbAbs),
//     });

//     // Redirect to the home page after editing the person
//     res.redirect("/");
//   } catch (error) {
//     console.error("Error editing a person:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Route for rendering the edit page
// app.get("/edit-person/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Fetch the details of the person using the provided ID
//     const response = await axios.get(
//       `http://localhost:8080/api/personnes/${id}`
//     );
//     const person = response.data;
//     console.log(res.data);

//     // Render the edit page with person details
//     res.render("edit", { person });
//   } catch (error) {
//     console.error("Error fetching person details for edit:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/totalUsersCount", async (req, res) => {
//   try {
//     const response = axios
//       .get("http://localhost:8080/api/personnes")
//       .then((response) => {
//         document.getElementById("totalUsersCount").innerText =
//           response.data.totalUsers;
//       })
//       .catch((error) => {
//         console.error("Error fetching total users count:", error);
//         document.getElementById("totalUsersCount").innerText = "Error";
//       });

//     const person = response.data;
//     console.log(res.data);

//     // Render the edit page with person details
//   } catch (error) {
//     console.error("Error fetching person details for edit:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/totalSalariesCount", async (req, res) => {
//   try {
//     const response = axios
//       .get("http://localhost:8080/api/personnes")
//       .then((response) => {
//         document.getElementById("totalUsersCount").innerText =
//           response.data.totalUsers;
//       })
//       .catch((error) => {
//         console.error("Error fetching total users count:", error);
//         document.getElementById("totalUsersCount").innerText = "Error";
//       });

//     const person = response.data;
//     console.log(res.data);

//     // Render the edit page with person details
//   } catch (error) {
//     console.error("Error fetching person details for edit:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
