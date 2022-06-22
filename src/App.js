import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Bar from "./components/Bar";
import Account from "./components/Login";
import Mainpage from "./components/Mainpage";
import ReviewPage from "./components/Review";

function App () {
  return <Router>
    <Bar />
    <Routes>
      <Route exact path="/" element={<Mainpage />} />
      <Route exact path="/review" element={<ReviewPage />} />
      <Route exact path="/login" element={<Account />} /> 
    </Routes>
  </Router>
    ;
};


export default App;

