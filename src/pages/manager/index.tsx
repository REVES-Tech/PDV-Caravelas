import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
  const [tipo, setTipo] = useState<string>("");




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
    console.log(tipo + name+ obs+price+photo)
    axios.post(URLpost,{
      "tipoProduto": tipo,
      "nome": name,
      "observacoes": obs,
      "preco": price,
      "foto": photo
    },{headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
    }}).then(function (response) {
    })

  }

  return (
    <div className="App">
      <Link to="/carrinho" className="Link">
        <button className="ButtonCart"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
</button>
      </Link>
          <div>
            <div className="Categoria">
              <div className="titulo">{post.name}</div>
              <div className="listaProdutos">
                        <div className="infoProd">
                        <form onSubmit={handleSubmit}>
                        <label>Name:</label><input className="qtd" onChange={handleChangeName}></input>
                          <label>Obs:</label><input className="qtd" onChange={handleChangeObs}></input>
                          <label>Price:</label><input className="qtd" onChange={handleChangePrice}></input>
                          <label>Photo:</label><input className="qtd" onChange={handleChangePhoto}></input>
                          <select onChange={handleChangeTipo}>
                          <option value="BEBIDA">Bebidas</option>
                           <option value="LANCHE">Lanche</option>
                            <option value="PORCAO">Porção</option>
                            </select>
                          <button onClick={handleSubmit}>MANDAR</button>
                          </form>
                        </div>
                      </div>
              </div>
            </div>
    </div>
  );
}

export default Menu;
