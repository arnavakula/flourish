from fastapi import FastAPI, UploadFile, File
import numpy as np
from io import BytesIO
from PIL import Image
import uvicorn
from tensorflow.keras.models import load_model
from constants import CLASS_NAMES

app = FastAPI()

model = load_model('./cnn-models/best_model.keras')

@app.get('/')
async def ping():
    return 'home page'

@app.post('/uploadfile/')
async def uploadfile(file: UploadFile = File(...)):
    img = np.array(Image.open(BytesIO(await file.read())))

    batch = np.expand_dims(img, 0)

    res = CLASS_NAMES[np.argmax(model.predict(batch))]

    print(res)
    
    return {'filename': res}

if __name__ == '__main__':
    uvicorn.run(app)