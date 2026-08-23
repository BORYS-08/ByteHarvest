# AgriVision AI — Smart Early Crop Disease & Outbreak Intelligence Platform

[![Smart India Hackathon 2026](https://img.shields.io/badge/SIH-2026-10B981?style=for-the-badge)](https://sih.gov.in)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

AgriVision AI is an extraordinary, mobile-responsive **Organic Modern Dark Theme** web application designed for the **Smart India Hackathon 2026**. It solves the critical problem of delayed crop disease detection, uncoordinated pest outbreak management, excessive pesticide application, and delayed expert diagnosis across Indian farming communities.

---

## 🌟 Key Platform Features & Multi-Persona Architecture

The application provides **4 specialized user personas**, switchable instantly via the top navigation bar during hackathon live demos:

1. 🌾 **Farmer Portal:**
   - **AI Reticle Crop Scanner:** Instant foliage & pest symptom diagnosis with laser reticle animation, confidence gauges, and organic vs. chemical remedy split.
   - **Voice & Audio Advisory Player:** Multilingual speech readout in English, Hindi, and regional languages for low-literacy farmers.
   - **Weather Risk Engine:** Temperature, relative humidity %, and crop stage disease risk gauges.

2. 🚜 **Extension Worker Portal:**
   - **Field Visit Planner:** Schedule farm visits, map location pins, and manage farmer contacts.
   - **Physical Sample Lab Referrals:** Log physical leaf/soil samples sent to central agricultural diagnostic laboratories.
   - **Offline Submission Queue:** Visual queue status for field submissions captured without internet connectivity.

3. 🔬 **Agri-Expert Reviewer Portal:**
   - **AI Scan Verification Queue:** Review unconfirmed AI diagnostics flagged as ambiguous or critical.
   - **Prescription Stamp Builder:** Issue official digital advisories with custom fungicide/pesticide prescriptions back to farmer devices.

4. 📊 **Agri-Official Surveillance Dashboard:**
   - **Geospatial Outbreak Heatmap & Radar:** Leaflet dark matter vector map displaying active infection clusters, severity levels, and district stats.
   - **30-Day Outbreak Timeline:** Temporal slider animating disease spread across districts.
   - **Emergency Alert Dispatcher:** Broadcast SMS / in-app notifications to high-risk farming zones.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 18+ (via Vite)
- **Multi-Page Routing:** React Router DOM (`react-router-dom`)
- **Styling & Aesthetics:** Tailwind CSS v4 + Modular Dark Surface Design System ([`src/styles/surfaces.css`](file:///d:/SIH%202026/frontend/src/styles/surfaces.css), [`animations.css`](file:///d:/SIH%202026/frontend/src/styles/animations.css), [`overrides.css`](file:///d:/SIH%202026/frontend/src/styles/overrides.css))
- **Icons:** React Icons (`react-icons/lu`, `react-icons/fi`, `react-icons/gi`, `react-icons/tb`)
- **Mapping & GIS:** Leaflet & React-Leaflet with CartoDB Dark Matter tiles
- **Mock Service & Data Layer:** Async `mockApi.js` backed by `localStorage` persistence (100% prepared to connect to a **Python FastAPI** backend later)

---

## 📁 Directory Structure

```
frontend/
├── public/
│   └── samples/                   # Pre-loaded sample crop photos (Rice Blast, Tomato Blight, etc.)
├── src/
│   ├── assets/                    # Static brand SVG icons & graphics
│   ├── components/
│   │   ├── common/                # Reusable UI Primitives (Navbar, DashCard, Btn, MetricCard)
│   │   ├── farmer/                # AiScannerHud, RemedyCard, VoiceAdvisoryBar, WeatherRiskWidget, DosageCalculator
│   │   ├── expert/                # ScanReviewQueue
│   │   ├── extension/             # VisitPlanner
│   │   ├── official/              # OutbreakMap (Leaflet), TimelineSlider
│   │   └── tracker/               # TreatmentTracker & Before/After Comparison
│   ├── context/
│   │   ├── AppContext.jsx         # Global State, Persona Switcher & Speech Player
│   │   └── ScanContext.jsx        # Dynamic Leaf Scan History & LocalStorage Sync
│   ├── pages/
│   │   ├── HomePage.jsx           # Portal Directory & Landing Hub
│   │   ├── FarmerPage.jsx         # Farmer Workspace View
│   │   ├── ExtensionPage.jsx      # Extension Field Portal
│   │   ├── ExpertPage.jsx         # Expert Reviewer Portal
│   │   ├── OfficialPage.jsx       # Agri-Official GIS Surveillance Dashboard
│   │   ├── ScannerPage.jsx        # Standalone AI Vision Scanner View
│   │   ├── HeatmapPage.jsx        # Standalone Outbreak Radar & Map View
│   │   └── CalculatorPage.jsx     # Safe Input & Dosage Calculator View
│   ├── services/
│   │   ├── mockApi.js             # Async Mock API endpoints (matching future FastAPI schemas)
│   │   └── mockData.js            # Initial realistic mock dataset (Crops, Scans, Outbreaks, Field Visits)
│   ├── styles/
│   │   ├── animations.css         # Keyframe definitions & utility animation classes
│   │   ├── overrides.css          # Third-party Leaflet map & scrollbar overrides
│   │   └── surfaces.css           # Neutral dark surface, panel, card, and input styles
│   ├── index.css                  # CSS Entry & Tailwind import
│   ├── App.jsx                    # React Router configuration & main shell
│   └── main.jsx                   # Application entry point
├── README.md                      # Project documentation
├── history.md                     # Stage progress log & context handoff tracker
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Local Setup & Development Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Production Bundle
```bash
npm run build
```

### 3. Run Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.