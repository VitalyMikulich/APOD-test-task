import React from 'react';

const ApodFrame = (props) => {
  
  if(props.url === null) {
    return (
      <p className="loading">Loading...</p>
  )}

  if(props.url === undefined) {
    return (
      <p className="noInfo">No information was found for this day. Please pick another day.</p>
  )}

  if (props.url.includes('youtube')) {
    return (
      <iframe
        title="APOD-youtube"
        width="960"
        height="540"
        src={props.url}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen />
  )}

  return (
    <img src={props.url} alt="apod" />
  )
}

export default ApodFrame;