"""
Created by Rana.


Run this for setting up the environment regarding models.
"""
import time, subprocess

def main(args):
    print(f'Setting Up Environment.')
    
    tic = time.time()
    def run_process(process):
        _ = subprocess.run(process,stdout=subprocess.PIPE).stdout.decode('utf-8')
    
    for process in args['processes']:
        run_process(process)
    
    toc = time.time()
    
    if args['debug']: 
        print(f'Total Time Taken : {toc - tic} seconds')
    print("Done Setting up environment.")
    return



if __name__ == '__main__':
    # List of processes, add your commands here for dependencies.
    all_process = [
        ['pip', 'install', 'torch==1.12.1+cu113', 'torchvision==0.13.1+cu113', '--extra-index-url', 
                'https://download.pytorch.org/whl/cu113'],
        ['pip', 'install', '-U', 'sentence-transformers'],
        ['pip', 'install', 'httpx'],
        ['pip', 'install', 'numpy'],
        ['pip', 'install', 'matplotlib'],
        ['pip', 'install', 'sklearn'],
        ['pip', 'install', 'diffusers==0.2.4'],
        ['pip', 'install', 'Flask'],
        ['pip', 'install', 'transformers'],
        ['pip', 'install', 'scipy'],
        ['pip', 'install', 'huggingface_hub'],
        ['pip', 'install', 'tqdm'],
        ['pip', 'install', '--upgrade', 'firebase-admin'],
        ['pip', 'install', '-U', 'deep-translator']
    ]
    
    args = {}
    args['processes'] = all_process
    args['debug'] = True
    main(args)
    
    