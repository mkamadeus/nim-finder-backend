const express = require("express");

const routes =  require("./routes");
const cors = require('cors')

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
  res.set('Cache-Control', 'public, max-age=15778000');
  next();
})
app.use("/api/nimfinder/", routes);

app.listen(port, () =>
  console.log(`NIM Finder API live at http://localhost:${port}`)
);
