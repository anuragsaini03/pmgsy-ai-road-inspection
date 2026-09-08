# RoadVision AI — PMGSY Road Inspection Frontend

A ready-to-run React + Vite prototype frontend for an AI-assisted PMGSY road inspection system.

## Features

- Dashboard with road statistics and condition trends
- AI road-image upload and mock analysis flow
- Chainage-wise road condition map
- Road inventory
- Inspection history
- Maintenance-priority queue
- Responsive desktop/tablet/mobile layout
- Mock data only — no backend required

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

## Connect the FastAPI + YOLO backend

The current AI inspection result is mocked in `src/App.jsx`.

Replace the timeout in the `Inspection` component with a request such as:

```js
const form = new FormData();
form.append("image", file);
form.append("road_id", roadId);
form.append("chainage", chainageValue);

const response = await fetch("http://localhost:8000/api/analyze-image", {
  method: "POST",
  body: form
});

const result = await response.json();
```

Expected backend response can contain:

```json
{
  "road_id": "UP-AG-102",
  "chainage": 2.4,
  "condition_score": 52,
  "condition": "Poor",
  "detections": [
    {
      "class": "pothole",
      "confidence": 0.94,
      "severity": "high"
    }
  ]
}
```

## Suggested production stack

Frontend:
- React + Vite
- Recharts
- Lucide React

Backend:
- Python + FastAPI
- YOLO/PyTorch
- OpenCV

Database:
- PostgreSQL + PostGIS

Maps:
- OpenStreetMap + Leaflet

> The condition score shown in this prototype is illustrative and must be replaced/validated against the applicable official PCI methodology before operational use.
