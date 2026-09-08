import json
from pathlib import Path
DB_PATH=Path(__file__).resolve().parent.parent.parent/'inspections.json'
def _read():
    if not DB_PATH.exists(): return []
    try:return json.loads(DB_PATH.read_text(encoding='utf-8'))
    except:return []
def _write(items):DB_PATH.write_text(json.dumps(items,indent=2),encoding='utf-8')
def create_inspection(record):
    items=_read(); items.insert(0,record); _write(items); return record
def list_inspections():return _read()
def get_chainage(road_id):return [x for x in _read() if x.get('road_id')==road_id]
