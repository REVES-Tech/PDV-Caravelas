import React from 'react';
import logo from '../../logo.svg';

function Home() {
    return (
      <div className="App">
        <header className="App-header">

            <div className='LightTop'> </div>
            <img src={logo} className='App-logo'/>
            <p>CARAVELAS</p>
          <button className='ButtonsHome'>Pedido</button>
          <button className='ButtonsHome'>Chamar garçom</button>
        </header>
      </div>
    );
  }
  
  export default Home;
  