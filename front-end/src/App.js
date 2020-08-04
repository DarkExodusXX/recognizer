import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImagineLinkForm from './components/ImagineLinkForm/ImagineLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: 'c16fbf16d3cc4d5dbe28f7bfb21e6bbe'
});

const particlesOptions = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
    };
  };
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  
  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl)
      .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch((err) => console.log(err))
  };
  
  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState({isSignedIn: false});
    } else {
      if (route === 'home') {
        this.setState({isSignedIn: true});
      }
    }
    this.setState({route: route});
  }
  
  render() {
    return (
      <div className="App">
        <Particles
          params={particlesOptions}
          className='particles'
        />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        {this.state.route === 'signIn'
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : (this.state.route === 'home')
            ? <div>
                <Logo/>
                <Rank />
                <ImagineLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition
                  imageUrl={this.state.imageUrl}
                  box={this.state.box}
                />
              </div>
            : <Register onRouteChange={this.onRouteChange}/>
        }
      </div>
    );
  };
};

export default App;
