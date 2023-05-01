const express = require("express");
var cors = require("cors");
require("dotenv").config();
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/user.route");
const { appointmentRoute } = require("./Routes/appointment.route");
const { authentication } = require("./Middleware/authenticate.middleware");
const { doctorRouter } = require("./Routes/doctor.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/doctor", doctorRouter);

app.use(authentication);
app.use("/appointment", appointmentRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("server is Connected");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is Live at port ${process.env.port} `);
});
