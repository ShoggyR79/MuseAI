from dataclasses import dataclass
from flask import Flask, render_template, request, jsonify 


def generate(p, i, m, u):
    a = {"status": "true", "link":u}
    return a

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





# front end --- send me dictionary (json)
# i g'get' from front end (methods = 'get', 'post')

# use a function to  process the data

# data = request.json
# process data and send to model    2 strings, 2 lists 
# return jsonify(data) ---- send data back to frontend --- send id

