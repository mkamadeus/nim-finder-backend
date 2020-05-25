const mysql = require("mysql");
const fs = require("fs");
const path = require("path");

const resultCount = 10;

const connection = mysql.createPool(
  JSON.parse(fs.readFileSync(path.resolve(__dirname, "./credentials.json")))
);

let db = {};

db.studentNameQuery = (keyword, page) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM mahasiswa WHERE nama LIKE '%${keyword}%' ORDER BY nama LIMIT ${resultCount} OFFSET ${
        resultCount * (page || 0)
      }`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.studentNimQuery = (keyword, page) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM mahasiswa WHERE nim_fakultas LIKE '%${keyword}%' OR nim_jurusan LIKE '%${keyword}%' ORDER BY nama LIMIT ${resultCount} OFFSET ${
        resultCount * (page || 0)
      }`,
      (err, results) => {
        if(err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.studentNameCount = (keyword) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) AS count FROM mahasiswa WHERE nama LIKE '%${keyword}%'`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0].count);
      }
    );
  });
};

db.studentNimCount = (keyword) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) AS count FROM mahasiswa WHERE nim_fakultas LIKE '%${keyword}%' OR nim_jurusan LIKE '%${keyword}%'`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0].count);
      }
    );
  });
};

db.studentFacultyQuery = (faculty, year, page) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM mahasiswa WHERE fakultas = '${faculty}' AND tahun = ${year} ORDER BY nama LIMIT ${resultCount} OFFSET ${
        resultCount * (page || 0)
      }`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.studentFacultyCount = (faculty, year, page) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) AS count FROM mahasiswa WHERE fakultas = '${faculty}' AND tahun = ${year} ORDER BY nama LIMIT ${resultCount} OFFSET ${
        resultCount * (page || 0)
      }`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0].count);
      }
    );
  });
};

db.studentMajorQuery = (major, year, page) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM mahasiswa WHERE jurusan = '${major}' AND tahun = ${year} ORDER BY nama LIMIT ${resultCount} OFFSET ${
        resultCount * (page || 0)
      }`,
      (err, results) => {
        if(err) {
          return reject(err);
        }
        return resolve(results)
      }
    )
  })
}

db.studentMajorCount = (major, year, page) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) FROM mahasiswa WHERE jurusan = '${major}' AND tahun = ${year} ORDER BY nama LIMIT ${resultCount} OFFSET ${
        resultCount * (page || 0)
      }`,
      (err, results) => {
        if(err) {
          return reject(err);
        }
        return resolve(results[0].count)
      }
    )
  })
}

module.exports = db;