const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let result = await db.student_query(req.query.keyword.toString());
    // if(result.length == 0)
    // {
    //   const query_words = req.query.keyword.split(" ")
    //   for(let i = 0; i<query_words.length ;i++)
    //   {
    //     // console.log(query_words[i])
    //     if(query_words[i].toString().length > 2)
    //     {
    //       // console.log('processed')
    //       result = [...new Set([...result, ...(await db.student_query(query_words[i].toString()))])]
    //       // console.log(result)
    //       // result = result.concat(await db.student_query(query_words[i].toString()))
    //     }
    //   }
    // }
    res.json(result);
      
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  //   res.json("");
});

module.exports = router;
