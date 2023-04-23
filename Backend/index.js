require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const v1Route = require("./v1/route");
const html_to_pdf = require("html-pdf-node");
const { ReciptUI } = require("./common/ReciptUI");

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

//connect to mongo
const mongoDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        dbName: "DonorRecipt",
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("Mongo Connected");
      })
      .catch((err) => {
        console.log(err);
        console.log("Mongo Not Connected");
      });
  } catch (error) {
    console.error(error);
  }
};

//middlewares
app.use(cors());
app.use(logger("dev"));
app.use("/api/v1", v1Route);

app.get("/", async (req, res) => {
  let options = { format: "A4" };
  let file = { content: `<h1>Welcome to PDF Creation</h1>` };

  const data = await html_to_pdf
    .generatePdf(file, options)
    .then((pdfBuffer) => {
      return pdfBuffer;
    });

  res.setHeader("Content-Type", "application/pdf");
  return res.end(data);
});

app.post("/pdf", async (req, res) => {
  const {
    recipt_no,
    recipt_date,
    Donors_Name,
    Donors_Address,
    Donors_Money,
    refer,
    mobile,
  } = req.body;
  let options = { format: "A4" };
  let file = {
    content: ReciptUI(
      recipt_no,
      recipt_date,
      Donors_Name,
      Donors_Address,
      Donors_Money,
      refer,
      mobile
    ),
  };

  const data = await html_to_pdf
    .generatePdf(file, options)
    .then((pdfBuffer) => {
      return pdfBuffer;
    });

  res.setHeader("Content-Type", "application/pdf");
  return res.send(data);
});

app.listen(process.env.PORT || 3001, async () => {
  console.log(`Running on : `, process.env.PORT);
  await mongoDB();
});
