import requests


d = {'prompt': 'A magical town with tall crooked buildings, deformed tall buildings, slanted tall buildings, inspired by amsterdam and victorian england',
     'imgTags': ["night time", "digital painting", "highly detailed", "concept art", "game art", "matte painting", "octane render", "8 k", "unreal engine"],
     'musicTags': ["magical", "fantasy", "beautiful", "relaxing"],
     'userId': "ABC123",
     }

r = requests.post('http://129.59.9.156:5000/', json=d)
r.status_code

print(r.json())