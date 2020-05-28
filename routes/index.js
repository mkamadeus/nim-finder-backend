const express = require("express");
const student = require("../controllers/student");

const router = express.Router();

router.get("/", student.getStudentByQuery);
router.get("/faculties", (req, res) => {
    res.json(require('../json/list_fakultas.json'))
})
router.get("/majors", (req, res) => {
    res.json(require('../json/list_jurusan.json'))
})

module.exports = router;
