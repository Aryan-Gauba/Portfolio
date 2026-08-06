# Full-Stack Developer Portfolio & Analytics Platform

A modern, high-performance, full-stack portfolio built to showcase engineering projects, writeups, and technical experience. This repository is structured as a **monorepo** and deployed entirely as a unified, serverless application on **Vercel**, integrated with a **Neon PostgreSQL** database.

---

## 🚀 Live Demo
🔗 **[Live Website](https://aryan-gauba-portfolio.vercel.app/)**

---

## 🛠️ Tech Stack

### Frontend
* **React.js** (Vite-powered for blazing-fast builds and HMR)
* **Axios** (Configured with clean relative routing for seamless API communication)
* **Tailwind CSS** (For a responsive, modern, dark-themed user interface)

### Backend & Database
* **Node.js & Express** (Configured to run as optimized serverless functions on Vercel)
* **PostgreSQL** (Hosted on **Neon** serverless Postgres)
* **PG (node-postgres)** (For raw SQL query optimization and secure database pooling)

---

## 📐 Architecture & Deployment (Monorepo Style)

Unlike traditional setups requiring separate deployments for the frontend and backend, this application leverages a unified monorepo structure managed by a root-level `vercel.json` routing engine:

* **Single Domain Hosting:** The React client and Express server live on the exact same domain. This completely eliminates **CORS** configuration headaches.
* **Serverless Express:** Vercel automatically converts Express API endpoints (under `/api/*`) into isolated, auto-scaling serverless functions.
* **Seamless Local Proxying:** Local development leverages Vite’s internal server proxy, mapping frontend requests seamlessly to a local `localhost:5000` Express instance.

---

## 🌟 Key Features

* **Dynamic Portfolio Showcase:** Visually clean cards detailing active projects, tech tags, and code repositories.
* **Interactive Contact Form:** A robust contact pipeline with defensive, crash-safe error handling that securely logs visitor messages.
* **Silent Analytics Tracker:** A lightweight tracking system that logs page visits (`/api/visit`) asynchronously without degrading client-side performance.
* **Defensive Error Handling:** Built-in safeguards to catch database and network errors gracefully, preventing runtime UI crashes on the frontend.

---

## ⚙️ Local Development Setup

### 1. Clone the repository
```bash
git clone [https://github.com/Aryan-Gauba/aryan-gauba-portfolio.git](https://github.com/Aryan-Gauba/aryan-gauba-portfolio.git)
cd aryan-gauba-portfolio
