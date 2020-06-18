import React, { useState, useEffect} from 'react';
import FramesContainer from '../FramesContainer/FramesContainer';
import * as moment from 'moment/moment'
import './Gallery.css';

const transformToCorrect = (number) => {
  if (number < 10) number = '0' + number;
  return number;
}

const getDaysInMonth = (year, month) => {
  return moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()
}

async function getAPODSForMonth (year, month) {
  const urls = [];
  for (let day = 1; day <= getDaysInMonth(year, month); day++) {
    const responce = await fetch(`https://api.nasa.gov/planetary/apod?api_key=S8M7EpoDYpWZueVQT8qGvGgZaalgUOr9O2UpZIwC&date=${year}-${month}-${transformToCorrect(day)}`);
    const data = await responce.json();
    if (data.url !== undefined && !urls.includes(data.url)) urls.push({url: data.url, date: `${year}-${month}-${day}`});
  }
  return urls;
}


async function loadFrames(set, year, month) {
  set(await getAPODSForMonth(year, month));
}

const Gallery = (props) => {
  const todaysDate = sessionStorage.getItem('galleryDate') !== null ? sessionStorage.getItem('galleryDate') : props.todaysDate;
  const max = {year: new Date(props.todaysDate).getFullYear(), month: transformToCorrect(new Date(props.todaysDate).getMonth() + 1)};
  const [month, setMonth] = useState(transformToCorrect(new Date(todaysDate).getMonth() + 1));
  const [year, setYear] = useState(new Date(todaysDate).getFullYear());
  const [urls, setUrls] = useState(false);
  useEffect(() => {
    document.querySelector('#apodLink').addEventListener('click', () => {
      document.querySelector('#gallery-date').classList.add('display-none');
    })
  })
  return (
    <div className="gallery-container">
      <div>
        <label htmlFor="month-picker">Please pick month</label>
        <input type="month"
               className="month-picker" 
               name="month-picker"
               id="month-picker"
               min="1995-06"
               max={`${max.year}-${max.month}`}
               onChange={(event) => {
                  setMonth(transformToCorrect(new Date(event.target.value).getMonth() + 1));
                  setYear(new Date(event.target.value).getFullYear());
                  setUrls([]);
                  document.querySelector('#gallery-date').classList.remove('display-none');
                  loadFrames(setUrls, new Date(event.target.value).getFullYear(), transformToCorrect(new Date(event.target.value).getMonth() + 1));
                  sessionStorage.setItem('galleryDate', event.target.value);
               }}/>
      </div>
      <div className="display-none" id="gallery-date">{year}-{month}</div>
      <div className="gallery">
          <FramesContainer urls={urls} />
      </div>
    </div>
  )
}

export default Gallery;