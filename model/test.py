import requests

d = {"prompt": "枯藤老树昏鸦，小桥流水人家",
     "imgTags": ["night time", "digital painting", "highly detailed", "concept art", "game art", "matte painting", "octane render", "8 k", "unreal engine"],
     "musicTags": ["magical", "fantasy", "beautiful", "relaxing"],
     "userId": "ABC123",
     "height":512,
     "width":512,
     "duration":15
     }

r = requests.post('http://127.0.0.1:5000', json = d)
r.status_code

print(r.json())