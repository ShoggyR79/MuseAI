import json
import subprocess
import httpx


# Authenticate Hugging face.
def _authenticate_hugging_face(token_file : str = '../authentications/hugging_face.json', debug : bool = False):
    token_string = json.dumps(token_file)['token']
    processes = [
        ['huggingface-cli', 'login'],
        [token_string]
    ]
    
    def run_process(process):
        _ = subprocess.run(process, stdout=subprocess.PIPE).stdout.decode('utf-8')
        return
    
    for process in processes:
        run_process(process)
        
    if debug : 
        print(f'Huggging Face Authenticated')
        
        
# Authenticate the Music API
def _authenticate_music_api(api_files : str = '../authentications/music_api.json', debug : bool = False) :
    authentication_json = json.load(api_files)
    details = httpx.post('https://api-b2b.mubert.com/v2/GetServiceAccess', authentication_json)
    details_returned = json.loads(details.text)
    patterns = details_returned['data']['pat']
    
    return patterns
    
# Authenticate Everything
def authenticate_models(hugging_face_json : str = '../authentications/hugging_face.json' , music_json : str = '../authentications/music_api.json', debug : bool = False):
    _authenticate_hugging_face(hugging_face_json, debug)
    patterns = _authenticate_music_api(music_json)
    
    return patterns