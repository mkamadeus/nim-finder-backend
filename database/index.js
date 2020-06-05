const mysql = require("mysql");

const resultCount = 20;

const connection = mysql.createPool(
  require('./credentials.json')
);

connection.getConnection((err) => {
  if(err) { return console.error(err); }

  console.log('Connected to MySQL Server.');
})

let db = {};

db.studentNameQuery = (keyword, page, order, asc) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM mahasiswa WHERE nama LIKE '%${keyword}%' ORDER BY ISNULL(${order}) ${asc ? 'ASC' : 'DESC'}, ${order} ${asc ? 'ASC' : 'DESC'} LIMIT ${resultCount} OFFSET ${
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

db.studentNimQuery = (keyword, page, order, asc) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM mahasiswa WHERE nim_fakultas LIKE '%${keyword}%' OR nim_jurusan LIKE '%${keyword}%' ORDER BY ISNULL(${order}) ${asc ? 'ASC' : 'DESC'}, ${order} ${asc ? 'ASC' : 'DESC'} LIMIT ${resultCount} OFFSET ${
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

db.studentFacultyQuery = (faculty, year, page, order, asc) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM mahasiswa WHERE fakultas = '${faculty}' AND tahun = ${year} ORDER BY ISNULL(${order}) ${asc ? 'ASC' : 'DESC'}, ${order} ${asc ? 'ASC' : 'DESC'} LIMIT ${resultCount} OFFSET ${
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

db.studentMajorQuery = (major, year, page, order, asc) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM mahasiswa WHERE jurusan = '${major}' AND tahun = ${year} ORDER BY ISNULL(${order}) ${asc ? 'ASC' : 'DESC'}, ${order} ${asc ? 'ASC' : 'DESC'} LIMIT ${resultCount} OFFSET ${
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

db.studentFacultyCount = (faculty, year, page) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*)  AS count FROM mahasiswa WHERE fakultas = '${faculty}' AND tahun = ${year}`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0].count);
      }
    );
  });
};

db.studentMajorCount = (major, year, page) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) AS count FROM mahasiswa WHERE jurusan = '${major}' AND tahun = ${year}`,
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
