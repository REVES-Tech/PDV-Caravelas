import React,{ useEffect } from 'react';
import logo from '../../logo.svg';
import {getCardapio} from '../../scripts/firestoreScripts'

function  Menu() {
    useEffect(() => {
        console.log(getCardapio);
      });
    console.log(getCardapio());
    return (
      <div className="App">
        <header className="App-header">

            <div className='LightTop'> </div>
            <img src={logo} className='App-logo'/>
            <p>CARAVELAAAAAAS</p>
          <button className='ButtonsHome'>Peddwaido</button>
          <button className='ButtonsHome'>Chamar dwagarçom</button>
        </header>
      </div>
    );
  }
  
  export default Menu;