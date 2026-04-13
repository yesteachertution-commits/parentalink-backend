require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db");
const apiRoutes = require("./routes/index");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
dbConnect();

app.use(
  cors({
    origin: ["http://localhost:5173"], // Replace with your actual frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use("/api", apiRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
