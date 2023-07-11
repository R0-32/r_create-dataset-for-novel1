import React, { useState } from 'react';

const Form = ({ onFormSubmit }) => {
  const [draftLocation, setDraftLocation] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [showFormData, setShowFormData] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Вызовите обработчик события, передав введенные данные
    onFormSubmit(draftLocation, selectedFile);
    setShowFormData(true);

    if (selectedFile) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          setFileContent(content);
        };
        reader.readAsText(selectedFile);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleTextChange = (event) => {
    setDraftLocation(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={draftLocation}
          onChange={handleTextChange}
          placeholder="Укажите расположение черновика"
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Старт</button>
      </form>

      {showFormData && (
        <div>
          <h2>Введенные данные:</h2>
          <p>Расположение черновика: {draftLocation}</p>
          <p>Выбранный файл: {selectedFile && selectedFile.name}</p>
          {fileContent && (
            <div>
              <h3>Содержимое файла:</h3>
              <pre>{fileContent}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;

