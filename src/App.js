import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/rank/rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'aa59938a89554675b97c8d7e5bbfa288'
});


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
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

calculateFaceLocation = (data) => {
const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputimage');
const width = Number(image.width);
const height = Number(image.height);
console.log(width, height);
return {
  leftCol: clarifaiFace.left_col * width,
  topRow: clarifaiFace.top_row * height,
  rightCol: width - (clarifaiFace.right_col * width),
  bottomRow: height - (clarifaiFace.bottom_row * height),
  }
}

displayFaceBox = (box) => {
  console.log(box);
  this.setState({box: box});
}

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));


  }
onRouteChange = (route) => {
  this.setState({route: route});
}



  render() {
    return (
    <div className="App">
    <Particles className='particles'
               params={particlesOptions}

               />
      <Navigation onRouteChange={this.onRouteChange}/>
{ this.state.route === 'home'
? <div>
<Logo />
<Rank />
<ImageLinkForm
onInputChange={this.onInputChange}
onButtonSubmit={this.onButtonSubmit}
/>
<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
</div>
: (

this.state.route == 'signin'
?
    <SignIn onRouteChange={this.onRouteChange}/>
    :
    <Register onRouteChange={this.onRouteChange}/>


)


}





    </div>
  );
}
}

export default App;
