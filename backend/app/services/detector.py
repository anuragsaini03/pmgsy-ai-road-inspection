from pathlib import Path
from typing import List,Dict,Tuple
import cv2
from ultralytics import YOLO
MODEL_PATH=Path(__file__).resolve().parent.parent.parent/'weights'/'best.pt'
FALLBACK_MODEL='yolo26n.pt'
_model=None
def get_model():
    global _model
    if _model is None: _model=YOLO(str(MODEL_PATH) if MODEL_PATH.exists() else FALLBACK_MODEL)
    return _model
def analyze_image(image_path:Path,output_dir:Path,inspection_id:str)->Tuple[List[Dict],str]:
    result=get_model().predict(source=str(image_path),conf=0.25,verbose=False)[0]
    names=result.names; detections=[]
    if result.boxes is not None:
        for box in result.boxes:
            cid=int(box.cls[0].item()); conf=float(box.conf[0].item()); xyxy=[round(float(x),2) for x in box.xyxy[0].tolist()]
            label=names.get(cid,str(cid)) if isinstance(names,dict) else str(cid)
            detections.append({'class':label,'confidence':round(conf,3),'severity':infer_severity(label,conf),'bbox':xyxy})
    name=f'{inspection_id}_annotated.jpg'; cv2.imwrite(str(output_dir/name),result.plot()); return detections,name
def infer_severity(label:str,confidence:float)->str:
    high=['pothole','severe','damage','rut']
    if any(x in label.lower() for x in high) and confidence>=.75:return 'High'
    if confidence>=.75:return 'Medium'
    return 'Low'
