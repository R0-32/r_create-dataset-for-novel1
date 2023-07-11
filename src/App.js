import React, { useState } from 'react';
import Form from './components/Form';
import Results from './components/Results';

const App = () => {
  const [resultData, setResultData] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleFormSubmit = async (draftLocation, file) => {
    const formData = new FormData();
    formData.append('draftLocation', draftLocation);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/process-draft', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка при обработке черновика');
      }

      const data = await response.json();
      setResultData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="App">
      <h1>Веб-интерфейс</h1>
      <Form onFormSubmit={handleFormSubmit} />
      <Results data={resultData} sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
    </div>
  );
};

export default App;

