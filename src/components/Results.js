import React from 'react';

const Results = ({ data, sortColumn, sortDirection, onSort }) => {
  const placeholderData = [
    {
      text: '',
      tokens: [],
      entities: [],
      keywords: [],
      label: '',
    },
  ];

  const sortedData = [...data]; // Создаем копию данных для сортировки

  // Функция для сортировки данных по выбранному столбцу и направлению
  const sortData = (column, direction) => {
    sortedData.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  sortData(sortColumn, sortDirection); // Сортируем данные

  const renderTableData = () => {
    const renderedData = sortedData.map((result, index) => (
      <tr key={index}>
        <td>{result.text}</td>
        <td>{result.tokens.join(', ')}</td>
        <td>{result.entities.join(', ')}</td>
        <td>{result.keywords.join(', ')}</td>
        <td>{result.label}</td>
      </tr>
    ));

    return renderedData.length ? renderedData : placeholderData.map((result, index) => (
      <tr key={index}>
        <td>{result.text}</td>
        <td>{result.tokens.join(', ')}</td>
        <td>{result.entities.join(', ')}</td>
        <td>{result.keywords.join(', ')}</td>
        <td>{result.label}</td>
      </tr>
    ));
  };

  return (
    <div>
      {data && (
        <div>
          <h2>Результаты обработки:</h2>
          <table className="results-table">
            <thead>
              <tr>
                <th onClick={() => onSort('text')}>Текст</th>
                <th onClick={() => onSort('tokens')}>Токены</th>
                <th onClick={() => onSort('entities')}>Сущности</th>
                <th onClick={() => onSort('keywords')}>Ключевые слова</th>
                <th onClick={() => onSort('label')}>Метка</th>
              </tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Results;

