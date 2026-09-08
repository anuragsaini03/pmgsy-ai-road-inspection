from pathlib import Path
from typing import Optional
from uuid import uuid4
from fastapi import APIRouter,File,Form,HTTPException,UploadFile
from fastapi.responses import FileResponse
from app.services.detector import analyze_image
from app.services.store import create_inspection,list_inspections,get_chainage
from app.services.scoring import calculate_condition
router=APIRouter(tags=['Inspection'])
BASE_DIR=Path(__file__).resolve().parent.parent.parent
UPLOAD_DIR=BASE_DIR/'uploads'; OUTPUT_DIR=BASE_DIR/'outputs'
ALLOWED={'.jpg','.jpeg','.png','.webp'}
@router.post('/analyze-image')
async def analyze(image:UploadFile=File(...),road_id:str=Form(...),chainage:float=Form(...),latitude:Optional[float]=Form(None),longitude:Optional[float]=Form(None)):
    ext=Path(image.filename or '').suffix.lower()
    if ext not in ALLOWED: raise HTTPException(400,'Only JPG, JPEG, PNG and WEBP images are supported.')
    if chainage<0: raise HTTPException(400,'Chainage cannot be negative.')
    content=await image.read()
    if len(content)>10*1024*1024: raise HTTPException(413,'Image is larger than 10 MB.')
    iid=f'INSP-{uuid4().hex[:8].upper()}'; original=UPLOAD_DIR/f'{iid}{ext}'; original.write_bytes(content)
    try: detections,annotated=analyze_image(original,OUTPUT_DIR,iid); result=calculate_condition(detections)
    except Exception as exc: raise HTTPException(500,f'AI analysis failed: {exc}') from exc
    record={'inspection_id':iid,'road_id':road_id.strip(),'chainage':chainage,'latitude':latitude,'longitude':longitude,'filename':image.filename,'detections':detections,**result,'annotated_image':f'/api/outputs/{annotated}'}
    create_inspection(record); return record
@router.post('/inspections')
async def save_inspection(road_id:str=Form(...),chainage:float=Form(...),latitude:Optional[float]=Form(None),longitude:Optional[float]=Form(None)):
    record={'inspection_id':f'INSP-{uuid4().hex[:8].upper()}','road_id':road_id.strip(),'chainage':chainage,'latitude':latitude,'longitude':longitude,'detections':[],'condition_score':None,'condition':'Pending','maintenance_priority':'Pending'}
    create_inspection(record); return record
@router.get('/inspections')
def inspections(): return {'items':list_inspections()}
@router.get('/roads/{road_id}/chainage')
def road_chainage(road_id:str): return {'road_id':road_id,'items':get_chainage(road_id)}
@router.get('/outputs/{filename}')
def output_image(filename:str):
    path=OUTPUT_DIR/Path(filename).name
    if not path.exists(): raise HTTPException(404,'Annotated image not found.')
    return FileResponse(path)
