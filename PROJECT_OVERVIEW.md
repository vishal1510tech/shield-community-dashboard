# Shield AI Threat Detection Dashboard — Comprehensive Project Documentation

Welcome to the official documentation for the **Shield AI Threat Detection Dashboard** (`threats.shieldcommunity.io`). This document provides a complete architectural overview of the system, component breakdowns, database integration details, and a comprehensive reference explaining the exact function of **every button and interactive control** in the application.

---

## Table of Contents
1. [Project Overview & Architecture](#project-overview--architecture)
2. [Technology Stack](#technology-stack)
3. [Directory Structure](#directory-structure)
4. [Complete Button & Interactive Control Guide](#complete-button--interactive-control-guide)
   - [1. Sidebar Navigation Controls](#1-sidebar-navigation-controls)
   - [2. Topbar Header Controls](#2-topbar-header-controls)
   - [3. SOC Overview Dashboard Controls](#3-soc-overview-dashboard-controls)
   - [4. Live AI Threat Stream & Incident Log Table Controls](#4-live-ai-threat-stream--incident-log-table-controls)
   - [5. Indicator Scanner & Ingestion Engine Controls](#5-indicator-scanner--ingestion-engine-controls)
   - [6. Telemetry Log Controls](#6-telemetry-log-controls)
   - [7. Threat Analytics View Controls](#7-threat-analytics-view-controls)
5. [Backend API REST Endpoints & SQLite Database](#backend-api-rest-endpoints--sqlite-database)
6. [How to Run & Build the Project](#how-to-run--build-the-project)

---

## Project Overview & Architecture

The **Shield AI Threat Detection Dashboard** is an enterprise-grade cybersecurity Security Operations Center (SOC) web application built for real-time crowdsourced threat telemetry monitoring, indicator sanitization, heuristic risk scoring, and interactive analytics.

### Key Capabilities
- **Real-Time Telemetry Stream**: Monitors incoming crowdsourced security incidents, malicious IPs, phishing URLs, and typosquatting domain indicators.
- **PII Parameter Sanitization Engine**: Automatically identifies and strips sensitive query parameters (e.g. `?token=usr_99812a`, `?session=secret`) from ingested URLs before recording them to the database.
- **SQLite Persistent Core**: Integrated Node.js + Express backend connected to a persistent SQLite database (`threats.db`) for storing and retrieving threat records.
- **3D Parallax & Metallic Design System**: Built with modern 3D depth cards (`card-3d`), 3D shiny metallic buttons (`btn-3d-primary`, `btn-3d-secondary`), executive Inter typography, and an HTML5 Canvas particle stardust infinity wave background (`ParticleWaveBackground.jsx`).

---

## Technology Stack

### Frontend
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 + Custom 3D Metallic Component Classes
- **Routing**: React Router DOM v7 (`BrowserRouter`, `Routes`, `Route`, `NavLink`)
- **Data Visualization**: Recharts (AreaChart, PieChart, BarChart)
- **Typography**: Inter (Sans-serif) + JetBrains Mono (Monospace for Technical Indicators)
- **Canvas Animations**: HTML5 Canvas 2D Context for 3D Parallax Stardust & Infinity Ribbon Wave

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express v5
- **Database**: SQLite3 (`sqlite3` N-API driver) with automatic seed data initialization
- **Middleware**: CORS (`cors`)

---

## Directory Structure

```
shield-community-dashboard/
├── index.html                           # Root HTML Entry Point
├── package.json                         # Frontend Dependencies & Build Scripts
├── src/
│   ├── main.jsx                         # React Root Application Mount
│   ├── App.jsx                          # Main Routing, Layout & Canvas Background Wrapper
│   ├── index.css                        # Design System, Inter Font & 3D Metallic Utilities
│   ├── components/
│   │   ├── ParticleWaveBackground.jsx   # 3D Parallax Canvas Particle & Infinity Ribbon Background
│   │   ├── Sidebar.jsx                  # Left Vertical Glass Navigation Panel
│   │   ├── Topbar.jsx                   # Sticky Top Header & Global Search Bar
│   │   ├── MetricCards.jsx              # 3D Metric Overview Cards (Active Threats, MTTD, etc.)
│   │   ├── ThreatTimelineChart.jsx      # Recharts 24-Hour Area Ingestion Timeline
│   │   ├── RiskDistributionChart.jsx    # Recharts Vector Donut Breakdown
│   │   ├── IncidentStreamTable.jsx      # Incident Table with Micro-Badges & Inspection Modal
│   │   ├── InspectionPanel.jsx          # Threat Ingestion Form & PII Sanitizer Preview
│   │   ├── TelemetryLog.jsx             # Filterable Log Stream with Compact/Detailed Density Toggle
│   │   └── AnalyticsView.jsx            # Category Density Bar Chart & Risk Metric Breakdown
│   ├── pages/
│   │   ├── Console.jsx                  # Main SOC Overview Dashboard Page (`/`)
│   │   ├── LiveFeed.jsx                 # Live Incident Detection Feed Page (`/feed`)
│   │   ├── Analytics.jsx                # Historical Threat Analytics Page (`/analytics`)
│   │   └── ReportForm.jsx               # Indicator Ingestion Scanner Page (`/report`)
│   ├── hooks/
│   │   └── useThreats.js                # Custom Hook for Backend SQLite API Ingestion & Sync
│   └── data/
│       └── mockThreats.js               # Initial Telemetry Dataset & System Health Constants
└── threat-backend/
    ├── server.js                        # Express REST Server (`http://localhost:5000`)
    ├── database.js                      # SQLite Database Setup & Automatic Seeding
    ├── threatScorer.js                  # Risk Scoring Logic & Sanitization Utilities
    ├── package.json                     # Backend Dependencies
    └── threats.db                       # SQLite Database File
```

---

## Complete Button & Interactive Control Guide

Below is a detailed guide explaining the exact function and behavior of **every single button and control** across the entire application.

---

### 1. Sidebar Navigation Controls (`Sidebar.jsx`)

Located on the left vertical panel of the screen:

| Control / Button Name | Element Type | Function & Behavior |
| :--- | :--- | :--- |
| **`Shield AI` Logo / Brand Link** | `NavLink` (`to="/"`) | Navigates the user back to the main SOC Overview Dashboard (`/`). Features a 3D hover scale animation. |
| **`Overview Dashboard` Button** | `NavLink` (`to="/"`) | Switches the primary view to the Overview Dashboard. When active, highlights in shiny 3D metallic white button styling (`btn-3d-primary`). |
| **`Live Threat Feed` Button** | `NavLink` (`to="/feed"`) | Switches the primary view to the Live Incident Feed (`/feed`). Features a red `LIVE` badge indicator. |
| **`Threat Analytics` Button** | `NavLink` (`to="/analytics"`) | Switches the primary view to Threat Analytics (`/analytics`). Displays historical chart metrics. |
| **`Indicator Scanner` Button** | `NavLink` (`to="/report"`) | Switches the primary view to Indicator Ingestion & Sanitization (`/report`). |
| **Mobile Drawer Overlay Click** | `div` (`onClick={onClose}`) | On small screen devices (mobile/tablet), clicking anywhere outside the opened sidebar closes the drawer. |

---

### 2. Topbar Header Controls (`Topbar.jsx`)

Located at the top sticky header bar:

| Control / Button Name | Element Type | Function & Behavior |
| :--- | :--- | :--- |
| **Mobile Hamburger Menu Button** | `button` (`onClick={onToggleSidebar}`) | Visible on mobile screens (`lg:hidden`). Toggles the vertical sidebar navigation drawer open or closed. |
| **Global Search Bar Input** | `input[type="text"]` | Allows real-time string filtering across threat indicators, IP addresses, domains, and CVE IDs in the main view. Features 3D inset shadow styling (`input-3d`). |
| **`Scan Indicator` Action Button** | `NavLink` (`to="/report"`) | Primary 3D metallic action button (`btn-3d-primary`) in the header that takes the user directly to the Indicator Ingestion Scanner (`/report`). |

---

### 3. SOC Overview Dashboard Controls (`Console.jsx` & Charts)

Located on the main Overview page (`/`):

| Control / Button Name | Element Type | Function & Behavior |
| :--- | :--- | :--- |
| **Timeframe Filter Buttons (`24h`, `7d`, `30d`)** | `button` (`onClick={() => setTimeframe(t)}`) | Located inside `ThreatTimelineChart.jsx`. Toggles the active timeframe dataset view for the 24-Hour Threat Ingestion & Anomaly Area Chart. Active option highlights in shiny 3D metallic style. |
| **Chart Tooltips** | Hover target (`Recharts Tooltip`) | Hovering over data points on the Area Chart or Donut Chart displays a floating 3D glass tooltip showing exact anomaly counts and percentages. |

---

### 4. Live AI Threat Stream & Incident Log Table Controls (`IncidentStreamTable.jsx`)

Located on the Overview page (`/`) and Live Feed page (`/feed`):

| Control / Button Name | Element Type | Function & Behavior |
| :--- | :--- | :--- |
| **Table Search Input** | `input[type="text"]` | Filters table rows in real time by checking matching text in indicator strings, Incident IDs, target nodes, or locations. |
| **Severity Filter Buttons (`ALL`, `Critical`, `High`, `Low`)** | `button` (`onClick={() => setFilterSeverity(sev)}`) | Filters table rows by severity level. Selecting `Critical` filters out all non-critical incidents. Selecting `ALL` resets the filter. |
| **Table Row Click** | `tr` (`onClick={() => setSelectedIncident(incident)}`) | Clicking anywhere on an incident row opens the **Forensic Telemetry Inspection Modal** for that specific threat. |
| **`Inspect →` Row Button** | `button` (`onClick={(e) => setSelectedIncident(incident)}`) | 3D metallic secondary button (`btn-3d-secondary`) on the right side of each row. Directly opens the Forensic Telemetry Inspection modal window. |
| **`Close Window` / `✕` Modal Buttons** | `button` (`onClick={() => setSelectedIncident(null)}`) | Closes the Forensic Telemetry Inspection modal overlay. |

---

### 5. Indicator Scanner & Ingestion Engine Controls (`InspectionPanel.jsx` / `ReportForm.jsx`)

Located on the Indicator Scanner page (`/report`):

| Control / Button Name | Element Type | Function & Behavior |
| :--- | :--- | :--- |
| **`Crypto Phish URL with Token` Preset Button** | `button` (`onClick={() => handleSelectPreset(...)}`) | Pre-fills the form input with `http://free-token-drop.xyz/auth?session=usr_99812a&token=secret_9912` to test PII parameter sanitization. |
| **`SYN Flood Scanner IP` Preset Button** | `button` (`onClick={() => handleSelectPreset(...)}`) | Pre-fills the form input with suspicious scanner IP `198.51.100.44`. |
| **`Spoofed Typosquat Email` Preset Button** | `button` (`onClick={() => handleSelectPreset(...)}`) | Pre-fills the form input with phishing domain `billing-alert@paypa1-security.com`. |
| **`Suspicious Indicator` Input Field** | `input[type="text"]` | Primary text input field where users enter raw URLs, IP addresses, or domain strings. Triggers real-time client-side parameter stripping preview (`sanitizationPreview`). |
| **`Operational Context` Textarea Field** | `textarea` | Optional notes box allowing operators to input context (e.g. "Probing port 443 in access logs"). |
| **`Sanitize & Ingest Threat` Button** | `button[type="submit"]` | Primary 3D metallic action button (`btn-3d-primary`). Submits threat data to Express backend (`POST /api/report`), stores it in SQLite database, updates local state, and displays success card with risk score. |

---

### 6. Telemetry Log Controls (`TelemetryLog.jsx`)

Located on the Live Log Stream component:

| Control / Button Name | Element Type | Function & Behavior |
| :--- | :--- | :--- |
| **`Detailed` / `Compact` Density Buttons** | `button` (`onClick={() => setDensity('...')}`) | Toggles data view density between detailed card list layout and compact multi-column data table. |
| **`Refresh Log` Button** | `button` (`onClick={onRefresh}`) | Calls backend `GET /api/threats` API to fetch latest database records and update UI state. Shows loading state during request. |
| **`Category` Dropdown Select** | `select` | Filters telemetry list by specific category (e.g., *Phishing Domain*, *Malicious Host*, *Typosquat Domain*, *Scanner Node*). |
| **`Retry Connection` Button** | `button` | Displays if a database connection error occurs. Triggers re-fetch attempt. |
| **`Dismiss Inspector` Button** | `button` | Closes the Telemetry Inspection Drawer modal. |

---

### 7. Threat Analytics View Controls (`AnalyticsView.jsx` / `Analytics.jsx`)

Located on the Threat Analytics page (`/analytics`):

| Control / Button Name | Element Type | Function & Behavior |
| :--- | :--- | :--- |
| **`Refresh Metrics` Button** | `button` (`onClick={onRefresh}`) | Re-triggers backend database query to calculate total indicators, high-risk counts, and category density for the bar chart. |
| **Bar Chart Bar Hover** | Hover target (`Recharts Tooltip`) | Hovering over category bars on the **Indicator Density by Category** chart displays exact count metrics for that vector. |

---

## Backend API REST Endpoints & SQLite Database

The backend server runs in `threat-backend/server.js` on port `5000`:

| HTTP Method | Endpoint Path | Function & SQLite Interaction |
| :--- | :--- | :--- |
| `GET` | `/api/threats` | Retrieves all threat records from SQLite `threats` table ordered by newest first (`ORDER BY created_at DESC`). |
| `POST` | `/api/report` | Sanitizes input string, calculates AI risk score, inserts record into SQLite `threats` table (`INSERT INTO threats ...`), and returns JSON response with created threat object. |
| `GET` | `/api/analytics` | Executes SQL aggregation (`SELECT type, COUNT(*) as count FROM threats GROUP BY type`) and returns category distribution data. |

---

## How to Run & Build the Project

### 1. Run Backend Server (Express + SQLite)
```powershell
cd shield-community-dashboard/threat-backend
node server.js
```
*Backend initializes SQLite `threats.db` and listens on `http://localhost:5000`.*

### 2. Run Frontend Development App (React + Vite)
```powershell
cd shield-community-dashboard
npm run dev
```
*Frontend opens at `http://localhost:5173`.*

### 3. Production Build
```powershell
cd shield-community-dashboard
npm run build
```
*Compiles optimized static bundle into `dist/`.*
