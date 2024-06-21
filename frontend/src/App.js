import React from 'react';
import LinkList from './components/Links/LinkList';
import AddLinkForm from './components/AddLinkForm';
import Header from './components/Header/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='bg-gray-200 min-h-screen'>
      <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<LinkList />} />
            <Route path="/add-link" element={<AddLinkForm />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

