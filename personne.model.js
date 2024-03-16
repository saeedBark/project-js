const { sendError } = require("../lib/utils.js");
const sql = require("./db.js");

class Personne {
  constructor(person) {
    this.nom = person.nom;
    this.email = person.email;
    this.nni = person.nni;
    this.phone = person.phone;
    this.salary = person.salary;
    this.department = person.department;
    this.nbPres = person.nbPres;
    this.nbAbs = person.nbAbs;
  }

  static create(newPersonne, result) {
    sql.query("INSERT INTO personne SET ?", newPersonne, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created person: ", { id: res.insertId, ...newPersonne });
      result(null, { id: res.insertId, ...newPersonne });
    });
  }

  static findById(id, result) {
    sql.query(`SELECT * FROM personnes WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found person: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Personne with the id
      result({ kind: "not_found" }, null);
    });
  }

  static getAll(nom, result) {
    let query = "SELECT * FROM personnes";
    if (nom) {
      query += ` WHERE nom LIKE '%${nom}%'`;
    }

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("personne: ", res);
      result(null, res);
    });
  }

  // static getUsersByName(nom, result) {
  //   sql.query(
  //     "SELECT * FROM personnes WHERE nom LIKE ?",
  //     [`%${nom}%`],
  //     (err, res) => {
  //       if (err) {
  //         console.log("Error: ", err);
  //         result(err, null);
  //         return;
  //       }

  //       result(null, res);
  //     }
  //   );
  // }

  static updateById(id, person, result) {
    sql.query(
      "UPDATE personne SET nom = ?, email = ?, nni = ?, phone = ?, salary = ?, department = ?, nbPres = ?, nbAbs = ? WHERE id = ?",
      [
        person.nom,
        person.email,
        person.nni,
        person.phone,
        person.salary,
        person.department,
        person.nbPres,
        person.nbAbs,
        id,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Personne with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated person: ", { id: id, ...person });
        result(null, { id: id, ...person });
      }
    );
  }

  static remove(id, result) {
    sql.query("DELETE FROM personnes WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Personne with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted person with id: ", id);
      result(null, res);
    });
  }

  static removeAll(result) {
    sql.query("DELETE FROM personnes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} personnes`);
      result(null, res);
    });
  }

  static getTotalCount(result) {
    sql.query("SELECT COUNT(*) AS totalUsers FROM personnes", (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      result(null, res[0].totalUsers);
    });
  }

  static getTotalSalaries(result) {
    sql.query(
      "SELECT SUM(salary) AS totalSalaries FROM personnes",
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }

        result(null, res[0].totalSalaries);
      }
    );
  }

  static getAverageSalary(result) {
    sql.query(
      "SELECT AVG(salary) AS averageSalary FROM personnes",
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }

        result(null, res[0].averageSalary);
      }
    );
  }

  static getAbsenteismRate(result) {
    sql.query(
      "SELECT SUM(nbAbs) AS totalAbsences, SUM(nbPres) AS totalPresences FROM personnes",
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }

        const totalAbsences = res[0].totalAbsences;
        const totalPresences = res[0].totalPresences;
        const total = totalAbsences + totalPresences;
        const absenteismRate = (totalAbsences / total) * 100;
        result(null, absenteismRate);
      }
    );
  }
}

export default Personne;
