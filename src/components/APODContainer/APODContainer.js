import React, { useState, useEffect} from 'react';
import ApodFrame from '../ApodFrame/ApodFrame';
import './APODContainer.css';

async function getAPOD (date) {
  const responce = await fetch(`https://api.nasa.gov/planetary/apod?api_key=S8M7EpoDYpWZueVQT8qGvGgZaalgUOr9O2UpZIwC&date=${date}`);
  const data = await responce.json();
  return await data;
}

const APODContainer = (props) => {
  let apodData = null;
  const [url, setUrl] = useState(null);
  useEffect(() => {
    (async function(){
      // eslint-disable-next-line react-hooks/exhaustive-deps
      apodData = await getAPOD(props.date);
      setUrl(apodData.url);
  })()
  })
  
  return (
    <div className="APODContiner">
      <div className="date">{props.date}</div>
      <div className="photo-container">
        <div className="APOD-title"></div>
        <ApodFrame url={url} />
      </div>
    </div>
  )
}

export default APODContainer;