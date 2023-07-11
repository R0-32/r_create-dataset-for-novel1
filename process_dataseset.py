import json
import pandas as pd

def process_draft_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    dataset = []
    
    for item in data:
        text = item['text_entities'][0]['text'] if 'text_entities' in item else ''
        
        dataset.append({
            'id': item['id'],
            'text': text,
            'tokens': text.split(),
            'entities': [],
            'keywords': [],
            'label': ''
        })
    
    return dataset

def save_dataset_to_csv(dataset, file_path):
    df = pd.DataFrame(dataset)
    df.to_csv(file_path, index=False)

if __name__ == '__main__':
    result_file_path = 'result.json'
    output_file_path = 'dataset.csv'
    
    dataset = process_draft_data(result_file_path)
    save_dataset_to_csv(dataset, output_file_path)
