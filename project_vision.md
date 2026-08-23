# PROJECT VISION SPECIFICATION
**System Title:** AgriVision AI — Smart Early Crop Disease & Pest Management Platform
**Event Context:** Smart India Hackathon (SIH) 2026 Problem Statement Implementation
**Project Scope:** High-Impact Modern Frontend Web Application (React + Vite + Tailwind CSS) with Modular Mock Service Layer

---

## 1. Executive Summary & Purpose
AgriVision AI is an extraordinary, dark-mode, multi-role agricultural surveillance and decision support system. It addresses the critical challenge of late disease detection, improper pesticide application, delayed expert diagnosis, and uncoordinated outbreak management in farming regions.

The system combines:
1. **AI Vision Crop Scanner (HUD experience):** Interactive photo upload and live reticle scanning for crop leaf and pest symptom identification with confidence scoring, bounding boxes, severity gauges, and organic/chemical remedies.
2. **Geospatial Outbreak Heatmap & Radar:** Real-time interactive map (Leaflet with dark tiles) visualizing infection hotspots, disease clusters, temporal risk trends, and regional alert filters.
3. **Safe Input & Dosage Calculator:** Interactive visual acreage slider and liquid volume meter to compute exact recommended biopesticides/chemical treatments.
4. **Follow-Up & Treatment Tracker:** Timeline graph and before/after diagnosis comparison tracking crop recovery over weeks.
5. **Multi-Role Switching Infrastructure:** Seamless top navbar switcher enabling instant live demonstration of 4 distinct user persona dashboards:
   - **Farmer Dashboard:** Quick scanner, weather risk gauge, voice/multilingual advisory, treatment logs.
   - **Extension Worker Portal:** Field visit scheduling, sample queue, community alert feed, offline sync queue status.
   - **Expert Diagnostic Portal:** AI diagnosis verification queue, high-res leaf inspection, custom prescription stamp.
   - **Agri-Official Surveillance Dashboard:** High-density geospatial intelligence, outbreak risk forecasting, intervention planner.

---

## 2. Technical Stack & Architecture

### Core Frontend Stack
- **Framework & Routing:** React 18+ (via Vite) with **React Router DOM** (`react-router-dom`) for multi-page route navigation (`/`, `/farmer`, `/extension`, `/expert`, `/official`, `/scanner`, `/heatmap`)
- **Styling:** Tailwind CSS (configured for Organic Modern Dark Theme)
- **Icons:** React Icons (`react-icons/lu`, `react-icons/fi`, `react-icons/gi`, `react-icons/tb`)
- **Mapping & GIS:** Leaflet / React-Leaflet with dark map tile providers (e.g. CartoDB Dark Matter)
- **State Management & Persistence:** React Context + Custom React Hooks backed by LocalStorage-persisted Mock Service layer

### Future Backend Architecture Roadmap
- **API Server & AI Inference:** **Python (FastAPI)** — Native integration with PyTorch/TensorFlow ML models, high performance async API endpoints, automatic Swagger docs.
- **Database:** PostgreSQL with **PostGIS** extension (or MongoDB with 2dsphere indexing) for fast geospatial proximity queries.
- **Mock Data Layer:** Frontend currently interacts with `src/services/mockApi.js` matching future FastAPI endpoint schemas (`/api/v1/scans`, `/api/v1/outbreaks`, `/api/v1/advisories`).

---

## 7. Project Directory Structure
```
frontend/
├── public/
│   └── samples/                   # Pre-loaded sample crop photos (Rice Blast, Tomato Blight, etc.)
├── src/
│   ├── assets/                    # Static brand SVG icons & graphics
│   ├── components/
│   │   ├── common/                # Reusable UI Primitives (Navbar, GlassCard, GlowButton, StatBadge)
│   │   ├── farmer/                # AiScannerHud, RemedyCard, VoiceAdvisoryBar, WeatherRiskWidget, DosageCalculator
│   │   ├── expert/                # ScanReviewQueue, ImageInspector, PrescriptionBuilder
│   │   ├── extension/             # VisitPlanner, LabReferralForm, OfflineQueueStatus
│   │   ├── official/              # OutbreakMap (Leaflet), TimelineSlider, BroadcastAlertModal, SurveillanceAnalytics
│   │   └── tracker/               # TreatmentTracker & Before/After Comparison
│   ├── context/
│   │   ├── AppContext.jsx         # Role Switcher State & Global Alerts
│   │   └── ScanContext.jsx        # Dynamic Leaf Scan History & LocalStorage Sync
│   ├── pages/
│   │   ├── HomePage.jsx           # Landing / Portal Directory Overview
│   │   ├── FarmerPage.jsx         # Farmer Workspace View
│   │   ├── ExtensionPage.jsx      # Extension Worker Field Portal
│   │   ├── ExpertPage.jsx         # Expert Reviewer Portal
│   │   ├── OfficialPage.jsx       # Agri-Official GIS Surveillance Dashboard
│   │   ├── ScannerPage.jsx        # AI Vision Scanner View
│   │   ├── HeatmapPage.jsx        # Standalone Outbreak Radar & Map View
│   │   └── CalculatorPage.jsx     # Safe Input & Dosage Calculator View
│   ├── services/
│   │   ├── mockApi.js             # Async Mock API endpoints (swappable with FastAPI)
│   │   └── mockData.js            # Initial realistic mock dataset (Crops, Scans, Outbreaks, Visits)
│   ├── styles/
│   │   └── index.css              # Organic Modern Dark design system tokens & glassmorphism
│   ├── App.jsx                    # React Router configuration & main shell
│   └── main.jsx                   # Application entry point
├── index.html
├── tailwind.config.js             # Custom Organic Dark colors (#08140C, #10B981, #00F0FF)
├── postcss.config.js
├── package.json
└── vite.config.js
```

---

## 3. UI/UX Aesthetic System & Design Tokens

### Color Palette (Organic Modern Dark Theme)
- **Canvas Base:** `#08140C` (Deep Forest Night)
- **Surface Elevation 1 (Cards):** `#0F2317` (Deep Emerald Dark Glass, 60-80% opacity, backdrop blur)
- **Surface Elevation 2 (Modals/Dropdowns):** `#163222` (Elevated Bio Glass)
- **Primary Glow / Accent:** `#10B981` (Vibrant Emerald / Neon Crop Leaf)
- **Secondary Accent:** `#00F0FF` (Tech Cyan Glow for AI HUD Elements)
- **Warning / Alert Accent:** `#F59E0B` (Amber Pest Warning)
- **Critical Outbreak Accent:** `#EF4444` (Crimson Outbreak Glow)
- **Text Primary:** `#F3F4F6` (Cool White)
- **Text Muted:** `#9CA3AF` (Subtle Slate Green)

### Visual Effects
- **Glassmorphism:** `backdrop-blur-md bg-opacity-70 border border-emerald-500/20`
- **Glow Accents:** `shadow-[0_0_20px_rgba(16,185,129,0.2)]`
- **Scanning Reticle:** Laser scanning sweep animation over crop image with bounding box targets.

---

## 4. Persona Workflows & Detailed Feature Specifications

### 4.1 Farmer Persona View
- **AI Scanner HUD:**
  - File drag-and-drop or webcam capture.
  - Quick-preset sample crop buttons (Rice Blast, Tomato Late Blight, Cotton Bollworm, Healthy Maize).
  - Scanning animation with radar grid and sound/audio indicator.
  - Detection result breakdown: Disease Name (Scientific + Local), Confidence Score (e.g. 94%), Severity Level (Moderate/Severe), Bounding Box Overlay.
  - Remedy Cards: Organic Remedies (Neem oil, bio-fungicides) vs Chemical Remedies (dosage & safety instructions).
  - Voice Advisory Widget: Audio player bar with simulated voice readout in English & Hindi.
- **Weather & Climate Risk Gauge:**
  - Live temperature, relative humidity %, rainfall, and crop stage risk indicator.
- **Dosage Calculator:**
  - Interactive plot size slider (Acres/Hectares).
  - Chemical/Biopesticide volume calculation with tank ratio & application instructions.
- **Treatment Log:**
  - Track crop recovery status over 4 weeks with before/after photo slider.

### 4.2 Extension Worker Persona View
- **Field Visit Planner:** Schedule of farm visits, map location pins, farmer contact info.
- **Offline Sync Queue:** Visual indicator showing pending field uploads waiting for network sync.
- **Lab Referral Submission:** Form to register physical leaf/soil samples sent to central agricultural laboratories.

### 4.3 Expert Diagnostic Reviewer View
- **Verification Queue:** List of unconfirmed AI scans flagged as uncertain or high-risk.
- **Diagnostic Inspection Canvas:** High-resolution zoom view, spectral analysis mode simulation, expert override toggle (Approve AI / Reclassify Disease).
- **Prescription Stamp Builder:** Form to issue official signed advisory back to farmer app.

### 4.4 Agriculture Official Surveillance Dashboard
- **Geospatial Outbreak Heatmap:** Dark interactive Leaflet map featuring color-coded risk clusters (Low/Medium/High Outbreak).
- **Outbreak Timeline Slider:** Play/pause past 30 days outbreak progression across districts.
- **Regional Intervention Planner:** One-click alert broadcast trigger (SMS/Notification) to farmers in high-risk zones.
- **Surveillance Analytics Cards:** Total acreage infected, top 3 prevalent diseases, response time metrics, pesticide usage efficiency.

---

## 5. Mock Dataset Structure (JSON Schemas)

1. `crops.json`: Catalog of supported crops, common diseases, symptoms, remedies, biopesticide dosages.
2. `scans.json`: Initial mock scan history (leaf images, detected disease, coordinates, status, severity).
3. `outbreaks.json`: GeoJSON-compatible points and heat clusters (lat, lng, district, crop, disease, severity, infectedAcres).
4. `expertQueue.json`: Flagged cases awaiting expert verification.
5. `extensionVisits.json`: Field visit logs and farmer registry.

---

## 6. End Product Goals & Hackathon Judging Criteria Alignment
- **Aesthetic Distinction:** Stand-out dark modern theme that breaks away from generic boilerplate dashboards.
- **Functional Completeness:** Seamless interactive user flows for all 4 user roles.
- **Technical Architecture:** Clean modular React codebase prepared for immediate backend API connectivity without frontend refactoring.
