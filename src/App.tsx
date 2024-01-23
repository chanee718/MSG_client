import React from 'react';
import './App.css';
import Cube from "./cube/Cube";
import { AuthProvider } from './types/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App" style={{ width: '100vw', height: '100vh' }}>
        <Cube />
      </div>
    </AuthProvider>
  );
}

export default App;
