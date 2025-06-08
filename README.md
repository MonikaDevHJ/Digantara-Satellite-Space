# 🛰️ Digantara Satellite Explorer

A responsive and high-performance satellite tracking app built using **Next.js** and **TypeScript**.  
This project was created as part of a frontend assessment for Digantara.

---

## 🔧 Tech Stack

- **Next.js 14 (App Router)** + TypeScript
- **Tailwind CSS** for styling
- **Digantara REST API** for real satellite data
- **React Hooks** for state management
- **Virtual scrolling** via `react-window` for large datasets
- **API Routing** using Next.js to handle CORS and proxy filtering

---

## 🔍 Features

### ✅ Core Functionality

- 🔎 Search for satellites by name or NORAD ID (partial matches supported)
- 🎯 Filter by:
  - Object Type (e.g., ROCKET BODY, PAYLOAD)
  - Orbit Code (e.g., LEO, GEO, etc.)
- 📊 Responsive table with columns:
  - `name`, `noradCatId`, `orbitCode`, `objectType`, `countryCode`, `launchDate`
- ⚡ Virtualized list rendering (smooth for ~27,000+ records)
- 🔄 Clean loading/error handling

---

### 🧪 Optional Features (Bonus)

- ✅ Select up to 10 satellites (with counter)
- ✅ Save selections in `localStorage`
- ✅ Navigate to a **Selected Satellites** page to view only chosen entries

---

## 🧠 API Behavior Notice

> A fallback message is shown when filtered results are empty due to incomplete data returned by the API.

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/MonikaDevHJ/Digantara-Satellite-Space.git
cd Digantara-Satellite-Space
