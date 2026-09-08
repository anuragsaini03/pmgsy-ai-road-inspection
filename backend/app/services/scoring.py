WEIGHTS={'pothole':30,'crack':15,'longitudinal crack':15,'transverse crack':15,'shoulder damage':10,'edge damage':10,'rutting':20,'vegetation':5,'drainage issue':10,'road sign':3,'delineator':3}
def calculate_condition(detections):
    penalty=sum(WEIGHTS.get(str(x.get('class','')).lower(),5)*float(x.get('confidence',.5)) for x in detections)
    score=max(0,min(100,round(100-penalty)))
    if score>=80:return {'condition_score':score,'condition':'Good','maintenance_priority':'Low','recommendation':'Continue routine monitoring.'}
    if score>=60:return {'condition_score':score,'condition':'Fair','maintenance_priority':'Medium','recommendation':'Schedule routine maintenance inspection.'}
    if score>=40:return {'condition_score':score,'condition':'Poor','maintenance_priority':'High','recommendation':'Schedule field verification and preventive maintenance assessment.'}
    return {'condition_score':score,'condition':'Critical','maintenance_priority':'Urgent','recommendation':'Prioritize field verification and urgent maintenance assessment.'}
