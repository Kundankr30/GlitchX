# Delhi-NCR Air Quality Intelligence: AI-Driven Pollution Source Identification, Forecasting & Policy Dashboard



**A submission for Smart India Hackathon 2025**

[![SIH2025](https://img.shields.io/badge/Smart%20India%20Hackathon-2025-blue.svg)](https://www.sih.gov.in/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()

---


## 🎯 Problem Statement
**ID25216: AI-Driven Pollution Source Identification, Forecasting & Policy Dashboard for Delhi-NCR**

The air pollution crisis in Delhi-NCR is a complex, seasonal, and multi-faceted challenge. It's driven by a combination of factors including agricultural stubble burning, high vehicular density, industrial emissions, and specific meteorological conditions. Existing tools often lack the necessary granularity to identify pollution sources in real-time and fail to provide actionable insights for both citizens and policymakers. This results in reactive, blanket policies that are often less effective and cause widespread disruption.

---

## 💡 Our Solution: Project AQURA
**Delhi-NCR Air Quality Intelligence** is a unified software platform that bridges the information gap between pollution data and decisive action. By leveraging satellite imagery, ground-sensor data, and advanced AI/ML models, AQURA provides a high-resolution view of the air quality landscape.

Our platform offers two tailored interfaces:
* A **Citizen App** to empower the public with personalized, hyperlocal information to protect their health.
* A **Policy Dashboard** to equip government agencies with the data-driven tools needed to craft precise, effective, and evidence-based interventions.

Our goal is to transform air quality management from a reactive guessing game into a proactive, data-centric science.

---

## ✨ Key Features

### For Citizens (Mobile & Web App) 🚶‍♀️
* **Hyperlocal AQI:** Real-time and forecasted AQI for your exact location, not just a city-wide average.
* **Personalized Health Alerts:** Customizable push notifications based on health profiles (e.g., asthma, elderly, children) when air quality deteriorates.
* **Safe Route Planner:** Integrates with maps to suggest the least polluted routes for commuting, jogging, or walking.
* **Source Awareness:** Simple, intuitive graphics showing the primary causes of pollution on any given day.

### For Policymakers (Policy Dashboard) 🏛️
* **Real-time Source Apportionment:** Interactive heatmaps and charts showing the percentage contribution of different pollution sources (e.g., Stubble Burning vs. Traffic vs. Industrial) across the NCR.
* **AI-Powered Forecasting:** Accurate 24-72 hour AQI forecasts to anticipate pollution events and act preemptively.
* **Intervention Effectiveness Simulator:** A "what-if" analysis tool to model the potential impact of policies (like the odd-even scheme or construction bans) before implementation.
* **AI-Generated Recommendations:** Actionable suggestions for targeted interventions based on real-time data and forecast models.

---

## 🏗️ System Architecture
Our system is built on a modern, scalable architecture designed for real-time data processing and analysis, flowing from data collection to actionable insights for end-users.

![System Architecture](https://i.imgur.com/G4y8mC1.png)
*(Replace the link with a path to your actual architecture diagram in the repository.)*

---


## 🧑‍💻 Meet the Team

| Name             | Role                  | GitHub Profile                               |
| ---------------- | --------------------- | -------------------------------------------- |
| [Soumya Ranjan Pradhan]  | Team Lead    | [Link to GitHub]                             |
| [Sharon Deb]  |  | [Link to GitHub]                             |
| [Kundan Kumar]  |    | [Link to GitHub]                             |
| [Aneesh Das Gupta]  |       | [Link to GitHub]                             |
| [Mohit Malik]  |     | [Link to GitHub]                             |
| [Omm Rout]  |      | [Link to GitHub]                             |

---

## 📜 License
This project is distributed under the MIT License. See `LICENSE` for more information.

---

## 🚀 Quick Start (MERN)

### Prerequisites
- Node.js 18+
- npm
- MongoDB (local or Atlas URI)
- Python 3 (for the forecast endpoint)

### 1) Install dependencies
```bash
# Frontend
cd client && npm install

# Backend
cd ../server && npm install
```

### 2) Configure environment
Create a `.env` in `server/`:
```bash
MONGO_URI=mongodb://localhost:27017/glitchx
PORT=5000
```
For MongoDB Atlas, use your SRV connection string:
```bash
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/glitchx?retryWrites=true&w=majority&appName=<AppName>
```

### 3) Run in development
Open two terminals:
```bash
# Terminal A - backend
cd server && npm run dev

# Terminal B - frontend
cd client && npm run dev
```
- Frontend: http://localhost:5173
- Backend health: http://localhost:5000/api/health
- Frontend proxy to API: http://localhost:5173/api/health

If accessing from another device on the network:
```bash
cd client && npm run dev -- --host
```

## 🧩 API Endpoints
- `GET /api/health` → `{ status, db, timestamp }`
- `GET /api/db-status` → `{ connected }`
- `GET /api/readings` → List readings (503 if DB disconnected)
- `POST /api/readings` → Create reading `{ locationName, latitude, longitude, so2, no2, spm }`
- `GET /api/forecast` → Runs `predict_aqi.py` and returns stdout

## 🗂️ Project Structure
```
GlitchX/
  client/           # React + Vite frontend
    public/         # static assets
    src/
      components/   # MapView, AQChart, Readings, Forecast
      App.jsx       # UI with tabs mirroring original site
      index.css     # Ported styles from style.css
  server/           # Express + Mongoose backend
    src/
      routes/       # readings, forecast, health
      models/       # Reading model
      index.js      # App entry
  predict_aqi.py    # Python forecast script
```

## 🏗️ Production build
Front-end build:
```bash
cd client && npm run build
```
This creates `client/dist/`. To serve from Express, add static serving in `server/src/index.js` (optional), or deploy separately to a static host.

## 🐞 Troubleshooting
- Frontend blank/"site can’t be reached":
  - Ensure dev servers running: `client:5173`, `server:5000`.
  - If remote device: run `npm run dev -- --host` in client.
- `db":"disconnected"` in `/api/health`:
  - Start MongoDB locally or set a valid Atlas `MONGO_URI`.
  - Ensure Atlas IP allowlist includes your machine.
- `/api/readings` returns 503:
  - DB not connected; start MongoDB or fix `MONGO_URI`.
- `GET /api/forecast` errors:
  - Ensure Python 3 is installed and accessible as `python3`.

## 🔐 Security
- Keep credentials out of source control. Use `.env` locally and environment variables in deployment.
- Rotate any credentials shared during testing.

## ✅ Scripts
Backend (`server/package.json`):
- `npm run dev` → Nodemon dev server
- `npm start` → Node server

Frontend (`client/package.json`):
- `npm run dev` → Vite dev server
- `npm run build` → Production build
- `npm run preview` → Preview build