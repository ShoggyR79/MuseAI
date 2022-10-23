import sys
sys.path.append('BLIP/')

from PIL import Image
import requests
import torch
from torchvision import transforms
from torchvision.transforms.functional import InterpolationMode
from models.blip import blip_decoder
from music_gen_utils import gen_music

def setup_blip(url = "https://storage.googleapis.com/sfr-vision-language-research/BLIP/models/model_base_capfilt_large.pth"):
    model = blip_decoder(pretrained=url, image_size=512, vit='base')
    model.eval()
    model = model.to('cuda:0')
    return model

def load_image(storage, img_name):
    storage.child(img_name).download(filename = img_name)
    raw_image = Image.open((img_name).raw).convert('RGB')   
    
    transform = transforms.Compose([
        transforms.Resize((512,512),interpolation=InterpolationMode.BICUBIC),
        transforms.ToTensor(),
        transforms.Normalize((0.48145466, 0.4578275, 0.40821073), (0.26862954, 0.26130258, 0.27577711))
        ]) 
    image = transform(raw_image).unsqueeze(0).to(device)   
    return image
    

def gen_img2music(blip, img_name, db, storage, pattern, user_id : str, duration : float):
    image = load_image(storage, img_name)
    caption = blip.generate(image, sample=False, num_beams=3, max_length=200, min_length=50) 
    generated_audio_name = gen_music(pattern, file_name, music_prompt, duration)
    
    storage.child(generated_audio_name).put(generated_audio_name)
    storage.child(img_name).put(img_name)
    
    media = {
        u'img_id' : img_name,
        u'audio_id' : generated_audio_name,
    }
    
    os.remove(img_name)
    os.remove(generated_audio_name)
    times, ref = db.collection(u'media').add(media)
    return {
        'id' : ref.id,
        'nsfw' : False,
    }
    
    
