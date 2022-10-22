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
        ['pip3', 'install', 'torch', 'torchvision', 'torchaudio'],
        ['pip3', 'install', '-U', 'sentence-transformers'],
        ['pip3', 'install', 'httpx'],
        ['pip3', 'install', 'numpy'],
        ['pip3', 'install', 'matplotlib'],
        ['pip3', 'install', 'sklearn'],
        ['pip3', 'install', 'diffusers==0.2.4'],
        ['pip3', 'install', 'Flask'],
        ['pip3', 'install', 'transformers'],
        ['pip3', 'install', 'scipy'],
        ['pip3', 'install', 'huggingface_hub'],
        ['pip3', 'install', 'tqdm']
    ]
    
    args = {}
    args['processes'] = all_process
    args['debug'] = True
    main(args)
    
    