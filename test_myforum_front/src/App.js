import React from 'react';
import './App.css';

import SignUp from './Components/signup';

function App() {
  return (
    <div className="App">
      <SignUp serverURL="http://localhost:3001"/>
    </div>
  );
}

export default App;
