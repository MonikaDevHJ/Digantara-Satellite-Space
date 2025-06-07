# 🛰️ Digantara Satellite Explorer

A responsive and high-performance satellite tracking app built using Next.js and TypeScript.  
This project was created as part of a frontend assessment for Digantara.

---

## 🔧 Tech Stack

- **Next.js 14 (App Router)** + TypeScript
- **Tailwind CSS** for styling
- **Digantara REST API** for real satellite data
- **React Hooks** for state management
- **Virtual scrolling** using `react-window` for performance
- **API routing** via Next.js to handle CORS and filtering

---

## 🔍 Features

### Core Functionality

- Search for satellites by name or NORAD ID (partial matches supported)
- Multi-select filtering by:
  - Object Type (ROCKET BODY, PAYLOAD, etc.)
  - Orbit Code (LEO, GEO, etc.)
- Responsive data table with:
  - Columns: name, NORAD ID, orbit, object type, country, launch date
  - Sorting support on name and ID
- Virtualized rendering to support large datasets (~27k+ objects)
- Clean loading and error UI

---

### Optional Features (Bonus)

- Row selection (max 10)
- Persist selections in localStorage
- Navigate to a second page to view selected satellites

---

## 🛠️ Getting Started

### 1. Clone this repo

```bash
git clone https://github.com/your-username/drt_react_monikahj.git
cd drt_react_monikahj
