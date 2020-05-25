const express = require("express");
const db = require("../database");
const student = require("../controllers/student");

const router = express.Router();

// const jurusan = fs.readFileSync(path.join(__dirname, "list_jurusan.json"));

// router.get("/", async (req, res, next) => {
//   const queryLength = req.query.keyword.length;

//   if (queryLength <= 2) {
//     next();
//   } else {
//     const q = [
//       req.query.keyword.slice(0, queryLength - 2),
//       req.query.keyword.slice(queryLength - 2),
//     ];
//     if (q[0].toLowerCase() in fakultas) {
//       console.log(fakultas[q[0]].toString(), 2000 + parseInt(q[1]));
//       const count = await db.student_query_faculty_count(fakultas[q[0]], 2000+parseInt(q[1]));
//       const data = await db.student_query_faculty(
//         fakultas[q[0]].toString(),
//         (2000 + parseInt(q[1]))
//       );

//       let result = {
//         count: count,
//         data: data,
//       };
//       console.log(result);

//       res.json(result);
//     }
//   }
// });

router.get("/", student.getStudentByQuery);

module.exports = router;
