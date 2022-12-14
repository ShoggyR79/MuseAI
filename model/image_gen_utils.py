import sys
import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from config_utils import authenticate_hugging_face

def get_pipeline(device : str = 'cuda:0', revision : str = "fp16", dtype = torch.float16):
    token_string = authenticate_hugging_face()
    pipeline = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", revision = revision, torch_dtype = dtype, use_auth_token=token_string)
    pipeline = pipeline.to(device)
    return pipeline

def gen_image(pipeline, file_name : str, prompt : str, height : int = 512, width : int = 512, num_inference_steps : int = 50, device : str = 'cuda:0'):
    print(width)
    print(height)
    with autocast("cuda"): 
        generated_image = pipeline(prompt, height = height, width = width, num_inference_steps = num_inference_steps)
        
    image = generated_image['sample'][0]
    name = 'images/' + file_name + '.png'
    image.save(name)
    if generated_image['nsfw_content_detected'][0] : 
        return name, False
    
    return name, True 


