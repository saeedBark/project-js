import sequelize from "../models/db.js";
import Person from "../models/person.model.js";

async function getAbsenteeismRate() {
  try {
    // Assuming 'Person' is your model and it's correctly defined
    // Replace 'nbAbs' and 'nbPres' with your actual column names for absences and presences
    const result = await Person.findAll({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("nbAbs")), "totalAbsences"],
        [sequelize.fn("SUM", sequelize.col("nbPres")), "totalPresences"],
      ],
      raw: true, // Gets plain data without Sequelize model instances
    });

    // Assuming result[0] because findAll returns an array
    const data = result[0];
    const total = data.totalAbsences + data.totalPresences;
    const absenteeismRate = (data.totalAbsences / total) * 100;

    return absenteeismRate; // This will automatically be wrapped in a Promise because the function is async
  } catch (error) {
    console.error("Error calculating absenteeism rate:", error);
    throw error; // This will automatically be a Promise rejection because the function is async
  }
}

export { getAbsenteeismRate };
