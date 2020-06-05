const db = require("../database");

const facultyMap = require("../json/list_fakultas.json");
const majorMap = require("../json/list_jurusan.json");

module.exports.getStudentByQuery = async (req, res) => {
  req.query.keyword = req.query.keyword.replace(RegExp(/\'/), "''");

  const keyword = req.query.keyword;

  if (RegExp(/[A-z]+[0-9][0-9]/).test(keyword)) {
    const prefix = keyword.slice(0, keyword.length - 2);

    if (prefix in facultyMap) {
      getStudentByFaculty(req, res);
    } else if (prefix in majorMap) {
      getStudentByMajor(req, res);
    } else {
      res.json({ data: [] });
    }
  } else if (RegExp(/[0-9]+/).test(keyword)) {
    getStudentByNim(req, res);
  } else {
    getStudentByName(req, res);
  }
};

const getStudentByNim = async (req, res) => {
  const keyword = req.query.keyword;
  const page = req.query.page || 0;
  const order = req.query.order || "nama";
  const asc = req.query.asc === "true" || typeof req.query.asc === "undefined";

  const data = await db.studentNimQuery(keyword, page, order, asc);
  const count = await db.studentNimCount(keyword);

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

const getStudentByName = async (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  const page = req.query.page || "0";
  const order = req.query.order || "nama";
  const asc = req.query.asc === "true" || typeof req.query.asc === "undefined";

  const data = await db.studentNameQuery(keyword, page, order, asc);
  const count = await db.studentNameCount(keyword);
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

const getStudentByFaculty = async (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  const page = req.query.page || 0;
  const order = req.query.order || "nama";
  const asc = req.query.asc === "true" || typeof req.query.asc === "undefined";

  const faculty = facultyMap[keyword.slice(0, keyword.length - 2)];
  const year = 2000 + parseInt(keyword.slice(keyword.length - 2));

  const data = await db.studentFacultyQuery(faculty, year, page, order, asc);
  const count = await db.studentFacultyCount(faculty, year);

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

const getStudentByMajor = async (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  const page = req.query.page || 0;
  const order = req.query.order || "nama";
  const asc = req.query.asc === "true" || typeof req.query.asc === "undefined";

  const major = majorMap[keyword.slice(0, keyword.length - 2)];
  const year = 2000 + parseInt(keyword.slice(keyword.length - 2));

  const data = await db.studentMajorQuery(major, year, page, order, asc);
  const count = await db.studentMajorCount(major, year);

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
