import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';

const particlesOptions = {

  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 80
      }
    }
  }
}


class App extends Component {
  render() {
    return (
    <div className="App">
    <Particles className='particles'
               params={particlesOptions}

               />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />

      {/*


      <Face Recognition />
  */  }
    </div>
  );
}
}

export default App;
