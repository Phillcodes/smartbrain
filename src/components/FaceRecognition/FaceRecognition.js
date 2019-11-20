import React from 'react';




const FaceRecognition = ( { imageUrl }) => {
  return (
  <div className='center ma'>
  <div className='absolut mt2'>
  <img id='inputimage' alt="" src={imageUrl} widt='500px' height='auto'/>
</div>
  </div>
  );
}



export default FaceRecognition;
