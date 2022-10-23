from dataclasses import dataclass
from flask import Flask, render_template, request, jsonify 
from gen_results import *
from image_gen_utils import *
from music_gen_utils import *
from config_utils import *



app = Flask(__name__)

pipeline = None
db, storage = None, None
patterns = None

@app.route('/', methods = ['GET', 'POST'])
def parse_data():
    
    global pipeline
    global db  
    global storage 
    global patterns
    
    if not pipeline:
        pipeline = get_pipeline()
        
    if not db : 
        db, storage = initialize_firebase()
        
    if not patterns : 
        patterns = authenticate_music_api()
    
    data = request.json
    prompt = data["prompt"]
    img_tag = data["imgTags"]
    music_tag = data["musicTags"]
    user_id = data["userId"]
    height = data["height"]
    width = data["width"]
    duration = data["duration"]

    
    result = generate(pipeline, db, storage, patterns, prompt, img_tag, music_tag, user_id, height, width, duration)
    if (result["nsfw"]):
        d = {"message": "error", "id": ""}
        return jsonify(d)
    else:
        d = {"message": "normal", "id": result["id"]}
        return jsonify(d)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug = True)