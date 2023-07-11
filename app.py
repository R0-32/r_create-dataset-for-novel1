from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process-draft', methods=['POST'])
def process_draft():
    draft_location = request.form['draftLocation']
    file = request.files['file']

    # Здесь выполняйте обработку черновика и генерацию результатов
    result_data = process_draft_data(draft_location, file)

    return jsonify(result_data)

def process_draft_data(draft_location, file):
    # Здесь выполняйте обработку черновика и генерацию результатов
    # Пример обработки черновика и генерации результатов
    # Возвращайте данные в следующем формате
    result_data = [
        {
            'text': 'Текст черновика 1',
            'tokens': ['токен 1', 'токен 2', 'токен 3'],
            'entities': ['сущность 1', 'сущность 2'],
            'keywords': ['ключевое слово 1', 'ключевое слово 2'],
            'label': 'метка 1'
        },
        {
            'text': 'Текст черновика 2',
            'tokens': ['токен 4', 'токен 5', 'токен 6'],
            'entities': ['сущность 3', 'сущность 4'],
            'keywords': ['ключевое слово 3', 'ключевое слово 4'],
            'label': 'метка 2'
        }
    ]

    return result_data

if __name__ == '__main__':
    app.run(debug=True)

