import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1>Dynamic Forms</h1>
        <div>
          <Link to="/formA" className="link">
            <button>Form A</button>
          </Link>
          <Link to="/formB" className="link">
            <button>Form B</button>
          </Link>
        </div>

        <Routes>
          <Route path="/formA" element={<Form formType="A" />} />
          <Route path="/formB" element={<Form formType="B" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
