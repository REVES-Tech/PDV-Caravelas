import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../logo.svg";

function Home() {
    return (
      <div className="App">
        <header className="App-header">

            <div className='LightTop'> </div>
            <img src={logo} className='App-logo' alt=""/>
            <p>CARAVELAS</p>
          <Link to="/menu" className='Link'><button className='ButtonsHome'>Pedido</button></Link>
          <Link to="/login" className='Link'><button className='ButtonsHome'>Gerenciar</button></Link>
        </header>
      </div>
    );
  }
  
  export default Home;
  