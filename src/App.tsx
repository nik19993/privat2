import { useState } from 'react';

import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container mx-auto p-4 max-w-screen-lg">
        <Header />
        <MainContent />
      </div>
    </>
  );
}

export default App;
