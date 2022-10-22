from dataclasses import dataclass
from flask import Flask, render_template, request, jsonify 

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])


def parse_data():
    data = request.json
    prompt = data["prompt"]
    img_tag = data["imgTags"]
    music_tag = data["musicTags"]
    user_id = data["userId"]
    result = generate(prompt, img_tag, music_tag, user_id)
    if result["status"] == "true":
        return jsonify(result["link"])
    else:
        return jsonify(result["status"])


if __name__ == "__main__":
    app.run(debug = True)


