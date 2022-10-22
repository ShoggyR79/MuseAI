from dataclasses import dataclass
from flask import Flask, render_template, request, jsonify 
from gen_results import generate

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])

def parse_data():
    data = request.json
    prompt = data["prompt"]
    img_tag = data["imgTags"]
    music_tag = data["musicTags"]
    user_id = data["userId"]
    height = data["height"]
    width = data["width"]
    duration = data["duration"]
    result = generate(prompt, img_tag, music_tag, user_id, height, width, duration)
    if (result["nsfw"]):
        d = {"message": "error", "id": ""}
        return jsonify(d)
    else:
        d = {"message": "normal", "id": result["id"]}
        return jsonify(d)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug = True)