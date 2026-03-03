import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Splash from './pages/Splash.jsx';

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Home />}></Route>
     </Routes>
    </>
  );
}


export default App;