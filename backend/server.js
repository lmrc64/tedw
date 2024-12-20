const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const api_prefix = process.env.API_PREFIX;
//console.log("port>"+process.env.APP_PORT);
//const port = process.env.APP_PORT;
const port = 3008;

const app = express();
app.use(cors());
app.use(express.json());

const categoryRoutes = require("./routes/categoryRoutes");
const couponRoutes = require("./routes/couponRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const authJwt = require('./libs/jwt')
const bucketRouter = require('./bucket/connection')
const chartRoutes = require("./routes/chartRoutes");

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(process.env.CONN_STRING);

    console.log("Connected Succesfuly..");

    app.use(`${api_prefix}`, chartRoutes);
    app.use(authJwt())
    app.use(`${api_prefix}`, categoryRoutes);
    app.use(`${api_prefix}`, couponRoutes);
    app.use(`${api_prefix}`, orderRoutes);
    app.use(`${api_prefix}`, productRoutes);
    app.use(`${api_prefix}`, userRoutes);
    app.use(`${api_prefix}`, bucketRouter);


    
    app.listen(port, () => {
      console.log(`Listening on port ${port}!`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}
