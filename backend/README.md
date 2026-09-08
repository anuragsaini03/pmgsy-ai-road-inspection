# PMGSY AI Road Inspection Backend

FastAPI + YOLO prototype backend for the RoadVision frontend.

## Run

```bash
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

Put your trained NRIDA/PMGSY YOLO model at `weights/best.pt`. Until then, the backend falls back to a small general YOLO model for API testing; those detections are NOT PMGSY road-defect detections.

## Main endpoint

`POST /api/analyze-image` multipart form fields:
- `image`
- `road_id`
- `chainage`
- `latitude` (optional)
- `longitude` (optional)

The condition score is illustrative prototype logic and must be replaced/validated against the applicable official PCI methodology before operational use.
