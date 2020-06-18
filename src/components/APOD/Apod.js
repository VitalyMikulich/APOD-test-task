import React, { useState } from 'react';
import './Apod.css';
import APODContainer from '../APODContainer/APODContainer';

const setItem = (todaysDate, date) => {
  sessionStorage.clear();
  if (date !== todaysDate) sessionStorage.setItem('date', date);
}

const Apod = (props) => {
  const todaysDate = props.todaysDate;
  const [date, setDate] = useState(sessionStorage.getItem('date') !== null ? sessionStorage.getItem('date') : todaysDate);
  return (
      <main>
        <input className="date-picker"
               name="date-picker"
               type="date"
               min="1995-06-16"
               max={todaysDate}
               onChange={(event) => {
                 setItem(todaysDate, event.target.value)
                 setDate(event.target.value)}} />
        <APODContainer date={date} />
      </main>
  );
}

export default Apod;