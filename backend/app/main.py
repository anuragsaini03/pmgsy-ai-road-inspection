from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.inspection import router as inspection_router
from app.routes.health import router as health_router
BASE_DIR=Path(__file__).resolve().parent.parent
for d in ('uploads','outputs','weights'):(BASE_DIR/d).mkdir(exist_ok=True)
app=FastAPI(title='RoadVision AI — PMGSY Road Inspection API',version='1.0.0')
app.add_middleware(CORSMiddleware,allow_origins=['http://localhost:5173','http://127.0.0.1:5173'],allow_credentials=True,allow_methods=['*'],allow_headers=['*'])
app.include_router(health_router)
app.include_router(inspection_router,prefix='/api')
@app.get('/')
def root(): return {'name':'RoadVision AI','service':'PMGSY Road Inspection API','docs':'/docs','status':'running'}
