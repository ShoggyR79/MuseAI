import json
import subprocess
import httpx


# Authenticate Hugging face.
def authenticate_hugging_face(token_file_name : str = './authentications/hugging_face.json', debug : bool = False):
    token_file = open(token_file_name)
    token_string = json.load(token_file)['token']

    if debug : 
        print(f'Huggging Face Authenticated')
        
    return token_string
        
        
# Authenticate the Music API
def authenticate_music_api(api_files : str = './authentications/music_api.json', debug : bool = False) :
    api_file = open(api_files)
    details = httpx.post('https://api-b2b.mubert.com/v2/GetServiceAccess', 
            json={
                "method":"GetServiceAccess",
                "params": {
                    "email": "ranamshahrozkhan@gmail.com",
                    "license":"ttmmubertlicense#f0acYBenRcfeFpNT4wpYGaTQIyDI4mJGv5MfIhBFz97NXDwDNFHmMRsBSzmGsJwbTpP1A6i07AXcIeAHo5",
                    "token":"4951f6428e83172a4f39de05d5b3ab10d58560b8",
                    "mode": "loop"
                }
            })
    details_returned = json.loads(details.text)
    patterns = details_returned['data']['pat']
    
    return patterns
    
# Authenticate Everything
def authenticate_models(hugging_face_json : str = './authentications/hugging_face.json' , music_json : str = './authentications/music_api.json', debug : bool = False):
    authenticate_hugging_face(hugging_face_json, debug)
    patterns = authenticate_music_api(music_json)
    
    return patterns