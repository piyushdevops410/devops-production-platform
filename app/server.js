const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;
const APP_VERSION = process.env.APP_VERSION || "1.0.0";
const ENVIRONMENT = process.env.ENVIRONMENT || "development";

app.use(express.json());

/*
====================================================
  LANDING PAGE
====================================================
*/

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>DevOps Production Platform</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, Helvetica, sans-serif;
      background: #f5f7fb;
      color: #1f2937;
      line-height: 1.6;
    }

    .navbar {
      background: #111827;
      color: white;
      padding: 18px 7%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 22px;
      font-weight: bold;
    }

    .logo span {
      color: #60a5fa;
    }

    .nav-status {
      font-size: 14px;
      color: #d1fae5;
    }

    .status-dot {
      display: inline-block;
      width: 9px;
      height: 9px;
      background: #22c55e;
      border-radius: 50%;
      margin-right: 6px;
    }

    .hero {
      background: linear-gradient(135deg, #111827, #1d4ed8);
      color: white;
      padding: 90px 7%;
    }

    .hero-content {
      max-width: 1100px;
      margin: auto;
    }

    .badge {
      display: inline-block;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 7px 14px;
      border-radius: 20px;
      font-size: 13px;
      margin-bottom: 20px;
    }

    .hero h1 {
      font-size: 52px;
      line-height: 1.15;
      margin-bottom: 20px;
    }

    .hero h1 span {
      color: #93c5fd;
    }

    .hero p {
      max-width: 720px;
      font-size: 19px;
      color: #dbeafe;
      margin-bottom: 30px;
    }

    .buttons {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .button {
      text-decoration: none;
      padding: 12px 22px;
      border-radius: 8px;
      font-weight: bold;
      display: inline-block;
    }

    .primary {
      background: white;
      color: #1d4ed8;
    }

    .secondary {
      border: 1px solid rgba(255,255,255,0.4);
      color: white;
    }

    .container {
      max-width: 1100px;
      margin: auto;
      padding: 60px 7%;
    }

    .section-title {
      text-align: center;
      margin-bottom: 40px;
    }

    .section-title h2 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .section-title p {
      color: #6b7280;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px;
    }

    .card {
      background: white;
      border-radius: 14px;
      padding: 28px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.07);
      border: 1px solid #e5e7eb;
    }

    .card-icon {
      font-size: 32px;
      margin-bottom: 15px;
    }

    .card h3 {
      margin-bottom: 10px;
    }

    .card p {
      color: #6b7280;
      font-size: 14px;
    }

    .architecture {
      background: #111827;
      color: white;
      padding: 60px 7%;
    }

    .architecture-content {
      max-width: 1100px;
      margin: auto;
    }

    .architecture h2 {
      text-align: center;
      margin-bottom: 35px;
      font-size: 32px;
    }

    .flow {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .flow-item {
      background: #1f2937;
      border: 1px solid #374151;
      padding: 18px 22px;
      border-radius: 10px;
      text-align: center;
      min-width: 120px;
    }

    .flow-item strong {
      display: block;
      margin-bottom: 4px;
      color: #93c5fd;
    }

    .arrow {
      font-size: 24px;
      color: #60a5fa;
    }

    .info-section {
      background: white;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    .info-box {
      background: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 22px;
    }

    .info-box small {
      display: block;
      color: #6b7280;
      margin-bottom: 6px;
    }

    .info-box strong {
      font-size: 17px;
    }

    .footer {
      background: #030712;
      color: #9ca3af;
      text-align: center;
      padding: 25px;
      font-size: 14px;
    }

    @media (max-width: 800px) {
      .hero h1 {
        font-size: 38px;
      }

      .cards {
        grid-template-columns: 1fr;
      }

      .info-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 500px) {
      .info-grid {
        grid-template-columns: 1fr;
      }

      .hero {
        padding: 65px 7%;
      }
    }
  </style>
</head>

<body>

  <nav class="navbar">
    <div class="logo">
      DevOps<span>Platform</span>
    </div>

    <div class="nav-status">
      <span class="status-dot"></span>
      System Operational
    </div>
  </nav>

  <section class="hero">
    <div class="hero-content">

      <div class="badge">
        🚀 Production-Ready DevOps Application
      </div>

      <h1>
        DevOps Production<br>
        <span>Platform</span>
      </h1>

      <p>
        A containerized Node.js application deployed using modern
        DevOps practices including Docker, Jenkins, Amazon ECR and
        Amazon ECS Fargate.
      </p>

      <div class="buttons">
        <a href="/health" class="button primary">
          Check Health
        </a>

        <a href="/api/products" class="button secondary">
          View API
        </a>
      </div>

    </div>
  </section>

  <section class="container">

    <div class="section-title">
      <h2>DevOps Technology Stack</h2>
      <p>Built using industry-standard cloud and DevOps technologies</p>
    </div>

    <div class="cards">

      <div class="card">
        <div class="card-icon">🐳</div>
        <h3>Docker</h3>
        <p>
          Application is packaged as a lightweight and portable
          Docker container.
        </p>
      </div>

      <div class="card">
        <div class="card-icon">🔧</div>
        <h3>Jenkins CI/CD</h3>
        <p>
          Automated pipeline performs application testing,
          Docker build, testing and image publishing.
        </p>
      </div>

      <div class="card">
        <div class="card-icon">☁️</div>
        <h3>AWS</h3>
        <p>
          Container image is stored in Amazon ECR and deployed
          using Amazon ECS Fargate.
        </p>
      </div>

      <div class="card">
        <div class="card-icon">📦</div>
        <h3>Amazon ECR</h3>
        <p>
          Secure private container registry for storing application
          Docker images.
        </p>
      </div>

      <div class="card">
        <div class="card-icon">🚢</div>
        <h3>ECS Fargate</h3>
        <p>
          Serverless container execution environment for running
          the production application.
        </p>
      </div>

      <div class="card">
        <div class="card-icon">📊</div>
        <h3>Monitoring</h3>
        <p>
          Application health and infrastructure monitoring can be
          integrated with CloudWatch and Prometheus.
        </p>
      </div>

    </div>
  </section>

  <section class="architecture">

    <div class="architecture-content">

      <h2>Deployment Architecture</h2>

      <div class="flow">

        <div class="flow-item">
          <strong>GitHub</strong>
          Source Code
        </div>

        <div class="arrow">→</div>

        <div class="flow-item">
          <strong>Jenkins</strong>
          CI/CD
        </div>

        <div class="arrow">→</div>

        <div class="flow-item">
          <strong>Docker</strong>
          Build
        </div>

        <div class="arrow">→</div>

        <div class="flow-item">
          <strong>ECR</strong>
          Registry
        </div>

        <div class="arrow">→</div>

        <div class="flow-item">
          <strong>ECS</strong>
          Fargate
        </div>

      </div>

    </div>

  </section>

  <section class="info-section">

    <div class="container">

      <div class="section-title">
        <h2>Application Information</h2>
        <p>Current runtime configuration</p>
      </div>

      <div class="info-grid">

        <div class="info-box">
          <small>Application</small>
          <strong>DevOps Production App</strong>
        </div>

        <div class="info-box">
          <small>Version</small>
          <strong>${APP_VERSION}</strong>
        </div>

        <div class="info-box">
          <small>Environment</small>
          <strong>${ENVIRONMENT}</strong>
        </div>

        <div class="info-box">
          <small>Port</small>
          <strong>${PORT}</strong>
        </div>

      </div>

    </div>

  </section>

  <footer class="footer">
    DevOps Production Platform
    <br>
    Built with Node.js + Express + Docker + Jenkins + AWS
  </footer>

</body>
</html>
  `);
});


/*
====================================================
  HEALTH CHECK API
====================================================
*/

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "devops-production-app",
    version: APP_VERSION
  });
});


/*
====================================================
  PRODUCTS API
====================================================
*/

app.get("/api/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Laptop",
      price: 75000
    },
    {
      id: 2,
      name: "Keyboard",
      price: 2500
    },
    {
      id: 3,
      name: "Mouse",
      price: 1200
    }
  ]);
});


/*
====================================================
  START SERVER
====================================================
*/

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Application started on port ${PORT} in ${ENVIRONMENT} environment`
  );
});

