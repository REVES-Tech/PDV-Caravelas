import React from 'react';
import Home from '../src/pages/home'
import './App.css';
import Routes from "./routes/routes";
import {AuthProvider} from './context/AuthContextProvider';

function App() {
  return (
    <AuthProvider>
    <Routes />
    </AuthProvider>
  );
}

export default App;
