const db = require('../database');

const facultyMap = require('../json/list_fakultas.json');
const majorMap = require('../json/list_jurusan.json');

module.exports.getStudentByQuery = async (req, res) => {
  // If keyword not specified
  if (typeof req.query.keyword === 'undefined') {
    res.status(400).send('Bad Request. Jangan asal geprek.');
    return;
  }

  // Escaping double quotes
  req.query.keyword = req.query.keyword.replace(RegExp(/\'/), "''");
  const keyword = req.query.keyword;

  if (RegExp(/[A-z]+[0-9][0-9]/).test(keyword)) {
    // If pattern matches for faculty/major query...

    // If prefix valid/listed..
    const prefix = keyword.slice(0, keyword.length - 2).toLowerCase();
    if (prefix in facultyMap) {
      getStudentByFaculty(req, res);
    } else if (prefix in majorMap) {
      getStudentByMajor(req, res);
    } else {
      res.json({ data: [] });
    }
  } else if (RegExp(/[0-9]+/).test(keyword)) {
    // ...else if searching for number (NIM)
    getStudentByNim(req, res);
  } else {
    // ...else search by name
    getStudentByName(req, res);
  }
};

const parseParameters = (req) => {
  // Parse parameters
  let query = req.query;
  query.keyword = query.keyword.toLowerCase();
  query.page = query.page || 0;
  query.order = query.order || 'nama';
  query.asc = query.asc === 'true' || typeof query.asc === 'undefined';

  // Returning parameters
  req.query = query;
  return req;
};

const formatResult = (res, page, count, data) => {
  if (page == 0) {
    res.json({
      count: count,
      page: page,
      data: data,
    });
  } else {
    res.json({
      page: page,
      data: data,
    });
  }
};

const getStudentByNim = async (req, res) => {
  const { keyword, page, order, asc } = parseParameters(req).query;

  const data = await db.studentNimQuery(keyword, page, order, asc);
  const count = await db.studentNimCount(keyword);

  formatResult(res, page, count, data);
};

const getStudentByName = async (req, res) => {
  const { keyword, page, order, asc } = parseParameters(req).query;

  const data = await db.studentNameQuery(keyword, page, order, asc);
  const count = await db.studentNameCount(keyword);

  formatResult(res, page, count, data);
};

const getStudentByFaculty = async (req, res) => {
  const { keyword, page, order, asc } = parseParameters(req).query;

  const faculty = facultyMap[keyword.slice(0, keyword.length - 2)];
  const year = 2000 + parseInt(keyword.slice(keyword.length - 2));

  const data = await db.studentFacultyQuery(faculty, year, page, order, asc);
  const count = await db.studentFacultyCount(faculty, year);

  formatResult(res, page, count, data);
};

const getStudentByMajor = async (req, res) => {
  const { keyword, page, order, asc } = parseParameters(req).query;

  const major = majorMap[keyword.slice(0, keyword.length - 2)];
  const year = 2000 + parseInt(keyword.slice(keyword.length - 2));

  const data = await db.studentMajorQuery(major, year, page, order, asc);
  const count = await db.studentMajorCount(major, year);

  formatResult(res, page, count, data);
};
