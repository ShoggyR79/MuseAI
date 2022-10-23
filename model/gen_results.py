import sys
import os
from image_gen_utils import gen_image
from music_gen_utils import gen_music
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import numpy as np
from google.cloud import storage
import pyrebase
from deep_translator import GoogleTranslator


def _parse_args(prompt, image_tags, music_tags):
    image_prompt = prompt
    for tag in image_tags:
        image_prompt += ', '
        image_prompt += tag
        
    music_prompt = prompt
    for tag in music_tags :
        music_prompt += ', '
        music_prompt += tag
        
    return image_prompt, music_prompt

def initialize_firebase() : 
    # Use a service account.
    config = {
        "apiKey": "AIzaSyAbQIzCBIKM9UH2xwH-uOYITjZppCAhrbE",
        "authDomain": "museai-7da19.firebaseapp.com",
        "projectId" : "museai-7da19",
        "databaseURL" : "xxxx",
        "storageBucket": "museai-7da19.appspot.com",
        "messagingSenderId": "792426663423",
        "appId": "1:792426663423:web:e2b1dcf08f7c2ef485ebca",
        "measurementId": "G-4H57BJ3110"
        }
    firebase = pyrebase.initialize_app(config)
    cred = credentials.Certificate('./authentications/firebase_configs.json')
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    storage = firebase.storage()
    return db, storage

def get_prompt(prompt):
    translated = GoogleTranslator(source='auto', target='en').translate(prompt)
    return translated
    


def generate(pipeline, db, storage, pattern, prompt : str, image_tags, music_tags, user_id : str, height : int, width : int, duration : float):
    prompt = get_prompt(prompt)
    file_name = user_id + str(np.random.randint(0, np.power(2, 32)))
    image_prompt, music_prompt = _parse_args(prompt, image_tags, music_tags)
    generated_image_name, nsfw = gen_image(pipeline, file_name, image_prompt, height, width)
    generated_audio_name = gen_music(pattern, file_name, music_prompt, duration)
    
    if not nsfw : 
        return {
            'id' : "JUNK",
            'nsfw' : True,
        }

    storage.child(generated_image_name).put(generated_image_name)
    storage.child(generated_audio_name).put(generated_audio_name)
    
    media = {
        u'img_id' : generated_image_name,
        u'audio_id' : generated_audio_name,
        u'prompt' : prompt 
    }
    os.remove(generated_image_name)
    os.remove(generated_audio_name)
    times, ref = db.collection(u'media').add(media)
    return {
        'id' : ref.id,
        'nsfw' : False,
    }
    
    
def generate2(pipeline, db, storage, pattern, prompt : str, image_tags, music_tags, user_id : str, height : int, width : int, duration : float):
    prompt = get_prompt(prompt)
    file_name = user_id + str(np.random.randint(0, np.power(2, 32)))
    image_prompt, music_prompt = _parse_args(prompt, image_tags, music_tags)
    generated_image_name, nsfw = gen_image(pipeline, file_name, image_prompt, height, width)
    generated_audio_name = gen_music(pattern, file_name, music_prompt, duration)
    
    if not nsfw : 
        return {
            'id' : "JUNK",
            'nsfw' : True,
        }

    storage.child(generated_image_name).put(generated_image_name)
    storage.child(generated_audio_name).put(generated_audio_name)
    
    media = {
        u'img_id' : generated_image_name,
        u'audio_id' : generated_audio_name,
        u'prompt' : prompt 
    }
    os.remove(generated_image_name)
    os.remove(generated_audio_name)
    times, ref = db.collection(u'media').add(media)
    return {
        'id' : ref.id,
        'nsfw' : False,
    }