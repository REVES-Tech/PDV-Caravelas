import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuthContext } from '../../context/AuthContextProvider';
import { LoginInput,LoginContainer,LoginButton } from './styles';



function Login() {
    const { isAuthenticated, setAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    
    const URLBase = "http://localhost:8080/admin/login";
    
    function handleLogin(e:any){
        e.preventDefault();
        setAuthenticated("setou")
            axios.post(URLBase,{    
                "username": username,
                "password": password},{headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                  }}).then((response)=> {
                    setAuthenticated(response.data);
                    localStorage.setItem("parentValueKey",response.data);
                    navigate('/manager');
                  })      
    }
    function handleChangeUsername(event:any){
        setUsername(event.target.value);
    }
    function handleChangePassword(event:any){
        setPassword(event.target.value);
    }

    return (
      <div className="App">
        <header className="App-header">
            <form onSubmit={handleLogin}>
            <p>Painel Administrativo</p>
              <LoginContainer>
                
            <LoginInput placeholder='Login' type="text" value={username} onChange={handleChangeUsername}/>
            <LoginInput placeholder="Senha" type="password" value={password} onChange={handleChangePassword}/>
            </LoginContainer>
            <LoginButton >Entrar!</LoginButton>
            </form>
        </header>
      </div>
    );
  }
  
  export default Login;
  