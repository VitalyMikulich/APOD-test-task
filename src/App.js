import React, { useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Apod from './components/APOD/Apod';
import Gallery from './components/Gallery/Gallery';

const getTodaysDate = () => {
  let today = new Date();
  const day = today.getDate();
  let month = today.getMonth() + 1;
  if (month < 10) month = '0' + month;
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
}

const App = () => {
  const todaysDate = getTodaysDate();
  useEffect(() => {
    document.querySelector('#galleryLink').addEventListener('click', () => {
      sessionStorage.clear();
    })
  })
  return (
    <div className="App">
      <header>Astronomy Picture of the Day</header>
      <nav>
        <Link to='/apod' id="apodLink">Show Picture of the Day</Link>
        <Link to='/gallery' id="galleryLink">Full gallery</Link>
      </nav>
      <Switch>
        <Route 
          path='/apod' 
          component={() => <Apod todaysDate={todaysDate}/>} 
        />
        <Route 
          path='/gallery' 
          component={() => <Gallery todaysDate={todaysDate}/>} 
        />
      </Switch>
    </div>
  );
}

export default App;
