import React from 'react';
import './App.css';
import MainTicTacToeContainer from './MainTicTacToeContainer';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            {/* Optionally remove the Template Button for a cleaner look */}
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          {/* Render the main TicTacToe game container */}
          <MainTicTacToeContainer />
        </div>
      </main>
    </div>
  );
}

export default App;