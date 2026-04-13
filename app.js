require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db");
const apiRoutes = require("./routes/index");
const cors = require("cors");
const app = express();
app.use(express.json());
dbConnect();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://parentalink-backend-fpqj.vercel.app",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use("/api", apiRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
