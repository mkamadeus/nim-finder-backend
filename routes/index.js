const express = require("express");
const student = require("../controllers/student");

const router = express.Router();

router.get("/", student.getStudentByQuery);
router.get("/test", (req, res) => {
    res.json({"message": "Success!"})
})

module.exports = router;
