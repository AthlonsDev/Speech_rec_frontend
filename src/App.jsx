import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Model_1 from './pages/model_1.jsx';
import Splash from './pages/Splash.jsx';

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Model_1 />}></Route>
      <Route path='/model_1' element={<Model_1 />}></Route>
     </Routes>
    </>
  );
}


export default App;
