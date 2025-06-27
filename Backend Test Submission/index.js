import express from "express";
import urlRoutes from "./routes/urlRoutes.js";
import { logger } from "./middlewares/logger.js";

const app = express();

app.use(express.json());

app.use(logger);

app.use("/shorturls", urlRoutes);

app.get("/", (req, res) => {
  res.send("URL Shortener Service is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
