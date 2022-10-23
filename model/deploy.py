from dataclasses import dataclass
from flask import Flask, render_template, request, jsonify 
from gen_results import *
from image_gen_utils import *
from music_gen_utils import *
from config_utils import *
from flask_cors import CORS
from img2music import *

app = Flask(__name__)
CORS(app)

pipeline = None
db, storage = None, None
patterns = None
blip = None

@app.route('/txt2muse', methods = ['GET', 'POST'])
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


@app.route('/img2muse', methods = ['GET', 'POST'])
def process_prompt2() : 
    global pipeline
    global db  
    global storage 
    global patterns
    global blip
    
    if not pipeline:
        pipeline = get_pipeline()
        
    if not db : 
        db, storage = initialize_firebase()
        
    if not patterns : 
        patterns = authenticate_music_api()
    
    if not blip : 
        blip = setup_blip()
        
    
    data = request.json
    prompt_image = data["imgId"]
    user_id = data["userId"]
    duration = data["duration"]
    
    result = gen_img2music(blip, prompt_image, db, storage, pattern, user_id, duration)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug = True)