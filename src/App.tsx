import React, { useState } from 'react';
import './App.css';
import CategoryTree from './data/components/CategoryTree';
import categoriesData from './data/categories.json';

const App: React.FC = () => {

  const [data, setData] = useState(categoriesData);

  return (
    <div className="App">
      <CategoryTree data={data} />
    </div>
  );
}

export default App;
