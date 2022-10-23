from dataclasses import dataclass
from flask import Flask, render_template, request, jsonify 

def generate(p,i,m,u):
    d = {"id": "abc123", "nsfd": True}
    return d

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])


def parse_data():
    data = request.json
    prompt = data["prompt"]
    img_tag = data["imgTags"]
    music_tag = data["musicTags"]
    user_id = data["userId"]
    result = generate(prompt, img_tag, music_tag, user_id)
    if (result["nsfd"]):
        d = {"message": "error", "id": ""}
        return jsonify(d)
    else:
        d = {"message": "normal", "id": result["id"]}
        return jsonify(d)


if __name__ == "__main__":
    app.run(debug = True)

