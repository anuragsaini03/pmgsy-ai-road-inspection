# PMGSY AI Road Inspection Backend

# 🛣️ PMGSY AI Road Inspection — Backend Service

The backend module for the **PMGSY AI Road Inspection** platform. This service handles data ingestion, REST API endpoints, image/video processing workflows, integration with AI computer vision models (such as YOLO/PyTorch), geospatial tagging, and report management for automated rural road quality auditing.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture & Workflow](#architecture--workflow)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Configuration](#environment-configuration)
  - [Installation & Running](#installation--running)
- [API Endpoints](#api-endpoints)
- [AI / ML Integration](#ai--ml-integration)
- [Database Schema & Migrations](#database-schema--migrations)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## 🔍 Overview

The Pradhan Mantri Gram Sadak Yojana (PMGSY) focuses on building and maintaining durable rural roads across India. Manual road inspection is time-consuming, subjective, and prone to delays. 

This backend service acts as the central hub connecting inspection field agents (mobile/web upload) to AI-powered road defect analysis engines (detecting potholes, cracks, rutting, and surface distress). It stores geo-referenced inspection data, processes visual media, invokes deep learning inference models, and surfaces analytical reports for government engineers and administrators.

---

## 🏗️ Architecture & Workflow

1. **Upload & Ingestion:** Field inspectors upload images or recorded video frames with GPS metadata (Latitude, Longitude, Timestamp).
2. **Preprocessing:** Media is sanitized, metadata is extracted, and frames are queued for processing.
3. **AI Inference:** Media is passed to the AI inference module (via integrated Python runtime or an external Flask/FastAPI ML service).
4. **Result Storage:** Detected bounding boxes, confidence scores, damage severity levels, and annotated media links are saved to the database.
5. **Dashboard & Reporting:** Web/mobile clients retrieve inspection metrics, map spatial data, and export inspection audit logs.

---

## ✨ Key Features

- **Media Handling:** File upload handling for raw inspection photos and short video feeds.
- **Geospatial Processing:** Geo-tagging inspection records using GPS coordinates.
- **AI Inference Pipeline:** Interface for running computer vision defect detection algorithms (e.g., Potholes, Transverse Cracks, Alligator Cracks).
- **Audit Reports:** Generation of aggregated road condition summaries and maintenance priority lists.
- **Role-Based Access Control (RBAC):** Distinct privileges for Inspector, Field Engineer, and Admin roles.
- **RESTful API:** Clean JSON endpoints for seamless integration with web and mobile frontends.

---

## 🛠️ Tech Stack

- **Runtime / Framework:** Node.js (Express.js) *or* Python (FastAPI / Flask)
- **Database:** PostgreSQL (with PostGIS) / MongoDB
- **AI/ML Integration:** PyTorch / OpenCV / YOLOv8
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Local Disk Storage / AWS S3 / Cloudinary
- **Containerization:** Docker

---

## 📂 Directory Structure

```text
backend/
├── config/             # Environment & DB configurations
├── controllers/        # Request handlers & logic
├── middleware/         # Auth, validation, & upload handlers
├── models/             # Database schemas / ORM models
├── routes/             # API routing handlers
├── services/           # Business logic & AI/ML integration adapters
├── utils/              # Helper functions, logger, geospatial helpers
├── ml_models/          # Model weights (.pt / .onnx) or inference scripts
├── uploads/            # Temporary local storage for incoming images
├── .env.example        # Environment variables template
├── package.json / requirements.txt
└── server.js / main.py # Application entry point

FastAPI + YOLO prototype backend for the RoadVision frontend.
