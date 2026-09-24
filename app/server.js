const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;
const APP_VERSION = process.env.APP_VERSION || "1.0.0";
const ENVIRONMENT = process.env.ENVIRONMENT || "development";

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "DevOps Production Platform",
    version: APP_VERSION,
    environment: ENVIRONMENT
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "devops-production-app",
    version: APP_VERSION
  });
});

app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 75000 },
    { id: 2, name: "Keyboard", price: 2500 },
    { id: 3, name: "Mouse", price: 1200 }
  ]);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Application started on port ${PORT} in ${ENVIRONMENT} environment`
  );
});
