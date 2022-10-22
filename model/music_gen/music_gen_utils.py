import sys
sys.path.append('../authenticators')

import numpy as np  
from sentence_transformers import SentenceTransformer 
import httpx
from config_utils import authenticate_music_api
import tqdm
import requests
import json
import time


def _cosine_similarity(target_embedding, cur_embedding):
    return 1 - np.dot(cur_embedding, target_embedding)/(np.linalg.norm(cur_embedding)*np.linalg.norm(target_embedding))
    
def _norm_similarity(target_embedding, cur_embedding):
    return np.linalg.norm(cur_embedding - target_embedding)

def _measure_similarity(embedding, embeddings, method : str = 'cosine'):
    similarity_scores = []
    
    for el in embeddings :
        if method == 'cosine' :
            similarity_scores.append(_cosine_similarity(embedding, el))
        if method == 'norm' :
            similarity_scores.append(_norm_similarity(embedding, el))
    
    return np.sort(similarity_scores), np.argsort(similarity_scores)
    

def _get_params(transformer_model : str = 'all-MiniLM-L6-v2'):
    transformer = SentenceTransformer('all-MiniLM-L6-v2')
    tags_strings = 'tribal,action,kids,neo-classic,run 130,pumped,jazz / funk,ethnic,dubtechno,reggae,acid jazz,liquidfunk,funk,witch house,tech house,underground,artists,mystical,disco,sensorium,r&b,agender,psychedelic trance / psytrance,peaceful,run 140,piano,run 160,setting,meditation,christmas,ambient,horror,cinematic,electro house,idm,bass,minimal,underscore,drums,glitchy,beautiful,technology,tribal house,country pop,jazz & funk,documentary,space,classical,valentines,chillstep,experimental,trap,new jack swing,drama,post-rock,tense,corporate,neutral,happy,analog,funky,spiritual,sberzvuk special,chill hop,dramatic,catchy,holidays,fitness 90,optimistic,orchestra,acid techno,energizing,romantic,minimal house,breaks,hyper pop,warm up,dreamy,dark,urban,microfunk,dub,nu disco,vogue,keys,hardcore,aggressive,indie,electro funk,beauty,relaxing,trance,pop,hiphop,soft,acoustic,chillrave / ethno-house,deep techno,angry,dance,fun,dubstep,tropical,latin pop,heroic,world music,inspirational,uplifting,atmosphere,art,epic,advertising,chillout,scary,spooky,slow ballad,saxophone,summer,erotic,jazzy,energy 100,kara mar,xmas,atmospheric,indie pop,hip-hop,yoga,reggaeton,lounge,travel,running,folk,chillrave & ethno-house,detective,darkambient,chill,fantasy,minimal techno,special,night,tropical house,downtempo,lullaby,meditative,upbeat,glitch hop,fitness,neurofunk,sexual,indie rock,future pop,jazz,cyberpunk,melancholic,happy hardcore,family / kids,synths,electric guitar,comedy,psychedelic trance & psytrance,edm,psychedelic rock,calm,zen,bells,podcast,melodic house,ethnic percussion,nature,heavy,bassline,indie dance,techno,drumnbass,synth pop,vaporwave,sad,8-bit,chillgressive,deep,orchestral,futuristic,hardtechno,nostalgic,big room,sci-fi,tutorial,joyful,pads,minimal 170,drill,ethnic 108,amusing,sleepy ambient,psychill,italo disco,lofi,house,acoustic guitar,bassline house,rock,k-pop,synthwave,deep house,electronica,gabber,nightlife,sport & fitness,road trip,celebration,electro,disco house,electronic'
    tags = np.array(tags_strings.split(','))
    tags_embeddings = transformer.encode(tags)
    return transformer, tags_strings, tags, tags_embeddings


def _get_tags_from_prompt(prompt, transformer_model : str = 'all-MiniLM-L6-v2', k_nearest : int = 5, debug : bool = False):
    transformer, tags_strings, tags, tags_embeddings = _get_params(transformer_model)
    latent_prompt = transformer.encode(prompt)
    tags_returned = []
    for i, prompt_z in enumerate(latent_prompt):
        similarity_scores, idxs = _measure_similarity(prompt_z, tags_embeddings)
        top_k_tags = tags[idxs[:k_nearest]]
        top_k_prob = 1 - similarity_scores[idxs[:k_nearest]]
        if debug:
            print(f"Prompt: {prompt[i]}\nTags: {', '.join(top_tags)}\nScores: {top_prob}\n\n\n")
        tags_returned.append((prompt[i], list(top_k_tags)))
    
    return tags_returned


def _select_mode(mode : bool):
    if mode : 
        return "loop"
    else : 
        return "track"


def get_track_by_tags(tags, patterns, duration, max_iterations=20, autoplay=False, loop=False):
    mode = _select_mode(loop)
    
    request = httpx.post('https://api-b2b.mubert.com/v2/RecordTrackTTM', 
        json={
            "method":"RecordTrackTTM",
            "params": {
                "pat": patterns, 
                "duration": duration,
                "tags": tags,
                "mode": mode
            }
        })

    requested_data = json.loads(request.text)
    assert requested_data['status'] == 1, requested_data['error']['text']
    trackurl = requested_data['data']['tasks'][0]['download_link']

    for i in tqdm.tqdm(range(max_iterations)):
        request = httpx.get(trackurl)
        if request.status_code == 200:
            return trackurl
        time.sleep(1)

def gen_music(file_name : str, prompt : str, duration : float, k_nearest : int = 5, loop : bool = False, maxit : int = 20):
    patterns = authenticate_music_api()
    x, tags = _get_tags_from_prompt(prompt = [prompt,], k_nearest = k_nearest)[0]
    audio_url = get_track_by_tags(tags, patterns, duration, maxit, loop=loop)
    audio_data = requests.get(audio_url)
    saved_file_name = file_name + '.mp3'
    with open(saved_file_name, 'wb') as f:
        f.write(audio_data.content)
    return;


    
    
