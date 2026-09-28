# DevOps Production Platform

This is a hands-on DevOps project that I built to practice a complete application deployment workflow.

I started with a simple Node.js application and then added Docker, Jenkins, AWS, Terraform, Trivy, Prometheus, Grafana and alerting step by step.

The main goal of this project was to understand how the different DevOps tools work together in a real deployment flow.

---

## Project Flow

```text
Developer
    |
    v
  GitHub
    |
    v
 Jenkins
    |
    +------------------+
    |                  |
    v                  v
Terraform          Docker Build
    |                  |
    v                  v
AWS Infrastructure  Trivy Scan
                       |
                       v
                     ECR
                       |
                       v
                  ECS Fargate
                       |
                       v
                 Node.js App
                       |
              +--------+--------+
              |                 |
              v                 v
         Prometheus          Grafana
              |
              v
           Alerts
```

---

## What I Built

### 1. Node.js Application

The application is built using Node.js and Express.

The application runs on port:

```text
3001
```

Available endpoints:

```text
/
 /health
 /api/products
 /metrics
```

Health check:

```bash
curl http://localhost:3001/health
```

Example response:

```json
{
  "status": "UP",
  "service": "devops-production-app",
  "version": "1.0.0"
}
```

---

## 2. Docker

I created a Dockerfile for the Node.js application.

Dockerfile:

```text
app/Dockerfile
```

The application runs inside a Docker container and exposes port `3001`.

Example:

```bash
docker build -t devops-production-app:latest ./app
```

Run locally:

```bash
docker run -d \
  --name devops-production-app \
  -p 3001:3001 \
  devops-production-app:latest
```

---

## 3. Jenkins CI/CD

Jenkins is used to automate the build and deployment process.

Pipeline file:

```text
jenkins/Jenkinsfile
```

The pipeline currently performs these steps:

```text
Checkout
   ↓
Terraform Init
   ↓
Terraform Validate
   ↓
Terraform Plan
   ↓
Terraform Approval
   ↓
Terraform Apply
   ↓
Application Test
   ↓
Docker Build
   ↓
Trivy Scan
   ↓
Docker Test
   ↓
AWS Authentication
   ↓
ECR Login
   ↓
Push Image to ECR
   ↓
ECS Deployment
```

The ECS deployment stage triggers a new deployment using AWS CLI:

```bash
aws ecs update-service \
  --cluster devops-production-cluster \
  --service devops-production-app \
  --force-new-deployment \
  --region us-east-1
```

---

## 4. Terraform

Terraform is used to manage the AWS infrastructure.

Terraform files:

```text
terraform/
├── main.tf
├── provider.tf
├── variables.tf
├── outputs.tf
└── .terraform.lock.hcl
```

Jenkins runs:

```bash
terraform init
terraform validate
terraform plan
terraform apply
```

There is a manual approval step before `terraform apply`.

---

## 5. AWS

The application is deployed on AWS.

The project uses services/components including:

* VPC
* Internet Gateway
* Subnets
* Security Groups
* Application Load Balancer
* Target Group
* Amazon ECR
* Amazon ECS Fargate
* IAM

The ECS cluster used for the application is:

```text
devops-production-cluster
```

ECS service:

```text
devops-production-app
```

Application container port:

```text
3001
```

---

## 6. Amazon ECR

Jenkins builds the Docker image and pushes it to Amazon ECR.

Repository:

```text
devops-production-app
```

The pipeline pushes both:

```text
<BUILD_NUMBER>
latest
```

The ECS task definition uses the image from ECR.

---

## 7. Trivy Security Scan

I added Trivy to the Jenkins pipeline to scan the Docker image.

The pipeline checks:

```text
HIGH
CRITICAL
```

Example command:

```bash
trivy image \
  --severity HIGH,CRITICAL \
  devops-production-app:<BUILD_NUMBER>
```

The scan output is also saved in:

```text
docs/security/trivy-image-scan.txt
```

---

## 8. Application Testing

Before pushing the image to ECR, Jenkins performs basic application tests.

Node.js syntax is checked using:

```bash
node --check server.js
```

The Docker container is also started temporarily and tested using:

```bash
curl -f http://localhost:3100/health
curl -f http://localhost:3100/api/products
```

The temporary test container is removed after the test.

---

## 9. Prometheus Monitoring

Prometheus is used to collect application and system metrics.

The Node.js application exposes metrics through:

```text
/metrics
```

Prometheus target:

```text
job="devops-app"
instance="localhost:3001"
```

Some of the application metrics used in the project are:

```text
http_requests_total
nodejs_eventloop_lag_mean_seconds
process_resident_memory_bytes
```

I also configured Node Exporter for system-level metrics.

---

## 10. Grafana

Grafana is connected to Prometheus as the data source.

I created an application monitoring dashboard with panels for:

* HTTP Request Rate
* Requests by Endpoint
* Application Memory Usage
* Node.js Event Loop Lag
* Application CPU Usage

Dashboard screenshot:

```text
screenshots/43-grafana-application-dashboard.png
```

---

## 11. Alerts

I created Prometheus alert rules for the application and server.

### Application

```text
DevOpsApplicationDown
```

Query:

```promql
up{job="devops-app"} == 0
```

This checks whether Prometheus can scrape the application.

### Server alerts

```text
HighCPUUsage
HighMemoryUsage
DiskSpaceLow
```

These rules are used to detect common server resource problems.

---

## 12. Alert Failure and Recovery Test

I tested the application-down alert manually.

First, I stopped the application.

Prometheus then reported:

```text
up{job="devops-app"} = 0
```

After the configured time, the alert changed to:

```text
firing
```

I then started the application again.

After recovery:

```text
up{job="devops-app"} = 1
```

and the alert returned to:

```text
inactive
```

Screenshots:

```text
screenshots/44-application-down-alert-firing.png
screenshots/45-application-up-zero.png
screenshots/46-application-recovery.png
```

This was useful for understanding how monitoring detects a failure and how the alert returns to normal after recovery.

---

## 13. ECS Deployment Test

I also tested the ECS deployment through Jenkins.

The final pipeline includes the ECS deployment stage and completed successfully.

Screenshots:

```text
screenshots/47-ecs-deployment-success.png
screenshots/48-jenkins-cicd-success.png
screenshots/49-ecr-latest-image.png
```

---

## 14. Troubleshooting Commands

Some commands I used while working on the project:

### Check application

```bash
curl http://localhost:3001/health
```

### Check port

```bash
sudo ss -lntp | grep :3001
```

### Check Docker containers

```bash
docker ps -a
```

### Check container logs

```bash
docker logs <container-name>
```

### Check Prometheus target

```bash
curl -sG 'http://localhost:9090/api/v1/query' \
  --data-urlencode 'query=up{job="devops-app"}'
```

### Check Prometheus rules

```bash
curl -s http://localhost:9090/api/v1/rules \
  | python3 -m json.tool
```

### Check ECS service

```bash
aws ecs describe-services \
  --cluster devops-production-cluster \
  --services devops-production-app \
  --region us-east-1
```

---

## Repository Structure

```text
devops-production-platform/
│
├── app/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── jenkins/
│   └── Jenkinsfile
│
├── terraform/
│   ├── main.tf
│   ├── provider.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── .terraform.lock.hcl
│
├── monitoring/
│
├── tests/
│
├── docs/
│   └── security/
│       └── trivy-image-scan.txt
│
├── screenshots/
│
├── ecs-task-definition.json
├── .gitignore
└── README.md
```

---

## Screenshots

The `screenshots` directory contains screenshots from different stages of the project.

They include:

* GitHub
* Application
* Docker
* Jenkins
* Terraform
* AWS
* ECR
* ECS
* ALB
* Trivy
* CloudWatch
* Prometheus
* Grafana
* Alerting
* ECS deployment

---

## What I Learned From This Project

While building this project, I worked through the complete flow instead of only studying individual tools.

The main things I practiced were:

* Git and GitHub workflow
* Jenkins pipelines
* Docker image creation and testing
* Terraform infrastructure
* AWS networking
* Amazon ECR
* Amazon ECS Fargate
* Load balancing
* Trivy image scanning
* Prometheus metrics
* Grafana dashboards
* Alert rules
* Failure and recovery testing
* AWS CLI
* Linux troubleshooting

---

## Cost Note

Some AWS resources can generate charges while they are running.

For this reason, I stopped or scaled down resources when they were not required for testing.

---

## Project Status

The main CI/CD, AWS deployment, security scanning, monitoring, alerting and recovery parts of the project have been implemented and tested.

This repository contains the configuration files and screenshots from the implementation.
