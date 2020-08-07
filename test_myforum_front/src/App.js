import React from 'react';

import SignUp from './Components/Form/form_signup';

function App() {
  return (
    <div className="App">
      <SignUp serverURL="http://localhost:3001"/>
    </div>
  );
}

export default App;
