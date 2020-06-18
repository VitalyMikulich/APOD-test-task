import React from 'react';
import { Link } from 'react-router-dom';

const FramesContainer = (props) => {
  if (props.urls === false) return null;

  if (props.urls.length === 0) return (
    <p className="loading">Loading...</p>
  )
  return props.urls.map((item, index) => {
    if(item.url.includes('youtube')) {
      return (
      <Link key={`frame${index}`} to='/apod' className="frame" onClick={() => {
        sessionStorage.setItem('date', item.date);
        document.querySelector('#gallery-date').classList.add('display-none');
      }}>
        <iframe
          title="APOD-youtube"
          width="533"
          height="300"
          src={item.url}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />
      </Link>
    )} else return (
      <Link key={`frame${index}`} to='/apod' className="frame" onClick={() => {
        sessionStorage.setItem('date', item.date);
        document.querySelector('#gallery-date').classList.add('display-none');
      }}>
        <img 
          src={item.url}
          alt="apod" />
      </Link>
    )
  });
}

export default FramesContainer