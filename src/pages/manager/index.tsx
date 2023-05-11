import React, { useContext, useState } from "react";
import { useAuthContext } from '../../context/AuthContextProvider';
import { Link } from "react-router-dom";
import axios from "axios";
import { InputContainer,FormContainer,SendButton } from "./styles";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

//import {getCardapio} from '../../scripts/firestoreScripts'

const baseURL = "http://localhost:8080/cardapio";
const URLpost = "http://localhost:8080/cardapio/produtos";
function Menu() {
  const [post, setPost] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [photo, setPhoto] = useState<string>("");
  const [obs, setObs] = useState<string>("");
  const [tipo, setTipo] = useState<string>("BEBIDA");
  const { isAuthenticated, setAuthenticated } = useAuthContext();




  function handleSubmit(event:any) {
    event.preventDefault();
    addCart(price,photo,name,obs,tipo)
  }

  function handleChangeName(event:any) {
    setName(event.target.value);
  }
  function handleChangeObs(event:any) {
    setObs(event.target.value);
  }
  function handleChangePrice(event:any) {
    setPrice(event.target.value);
  }
  function handleChangePhoto(event:any) {
    setPhoto(event.target.value);
  }
  function handleChangeTipo(event:any) {
    setTipo(event.target.value);
  }

  function addCart(price:number,photo:string,name:string,obs:string,tipo:string) {

    axios.post(URLpost,{
      "tipoProduto": tipo,
      "nome": name,
      "observacoes": obs,
      "preco": price,
      "foto": photo
    },{headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Authorization": localStorage.getItem("parentValueKey"),
    }}).then(function (response) {
    })

  }

  return (
    <div className="App">
      <Link to="/manager" className="Link">
        <button className="ButtonCart"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
</svg>
</button>
      </Link>
          <div>
            <div className="Categoria">
              <div className="titulo">{post.name}</div>
              <div className="listaProdutos">
                        <div className="infoProd">
                        <form onSubmit={handleSubmit}>
                          <FormContainer>
                        <InputContainer><label>Name:</label><input className="qtd" onChange={handleChangeName}></input></InputContainer>
                          <InputContainer><label>Obs:</label><input className="qtd" onChange={handleChangeObs}></input></InputContainer>
                          <InputContainer><label>Price:</label><input className="qtd" onChange={handleChangePrice}></input></InputContainer>
                          <InputContainer><label>Photo:</label><input className="qtd" onChange={handleChangePhoto}></input></InputContainer>
                          <select onChange={handleChangeTipo}>
                          <option value="BEBIDA">Bebidas</option>
                           <option value="LANCHE">Lanche</option>
                            <option value="PORCAO">Porção</option>
                            </select>
                          <SendButton onClick={handleSubmit}>MANDAR</SendButton>
                          </FormContainer>
                          </form>
                        </div>
                      </div>
              </div>
            </div>
    </div>
  );
}

export default Menu;
