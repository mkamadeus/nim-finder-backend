const mysql = require("mysql");
const fs = require('fs')
const path = require('path')

const connection = mysql.createPool(JSON.parse(fs.readFileSync(path.resolve(__dirname, './credentials.json'))));

let db = {};

db.student_query = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT nama, tahun, fakultas, jurusan, nim_fakultas, nim_jurusan FROM mahasiswa LEFT JOIN mahasiswa_jurusan ON mahasiswa.ina = mahasiswa_jurusan.ina WHERE nama LIKE '%${query}%' OR nim_fakultas LIKE '%${query}%' OR nim_jurusan LIKE '%${query}%' ORDER BY nama`,
      (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      }
    );
  });
};

module.exports = db;
