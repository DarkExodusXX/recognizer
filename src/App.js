import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImagineLinkForm from './components/ImagineLinkForm/ImagineLinkForm';
import Rank from './components/Rank/Rank';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

function App() {
  return (
    <div className="App">
      <Particles
        params={particlesOptions}
        className='particles'
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImagineLinkForm />
      {/*
      <FaceRecognition />
      */}
    </div>
  );
}

export default App;
