const express = require("express");
const routes =  require("./routes");
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/nimfinder/", routes);
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
