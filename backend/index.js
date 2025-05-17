const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {res.send("hii")});

// routers
const userRouter = require("./routes/user.routes");
const captainRouter = require("./routes/captain.routes");
const mapsRouter = require("./routes/maps.routes");
const rideRouter = require("./routes/ride.routes");
const { currentUser, authUser } = require("./middlewares/auth.middleware");

app.get("/current-user",currentUser);
app.use("/user",userRouter);
app.use("/captain",captainRouter);
app.use("/maps",authUser,mapsRouter);
app.use("/ride",rideRouter);

const { initializeSocket } = require("./socket");

const http = require("http");
const server = http.createServer(app);

initializeSocket(server);

server.listen(process.env.PORT ?? 4000, () =>{
  connectDB();
  console.log("Server running on port " + (process.env.PORT ?? 4000));
});
