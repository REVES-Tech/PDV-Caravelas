import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

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

const baseURL = "http://localhost:3000/Cardapio";
const URLpost = "http://localhost:3000/mesa";
function Menu() {
  const [post, setPost] = useState<any>([]);

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [teste, setTeste] = useState<any>("");
  const [categoria,setCategoria] = useState<any>("");
  const [qtd, setQtd] = useState<any>("");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  function handleChange(event:any) {
    setQtd(event.target.value);
    console.log(event.target.value)
    console.log("qtd = "+qtd)
  }
  function handleSubmit(event:any) {
    event.preventDefault();
    const {nome} = teste;
    addCart(nome,qtd,categoria)
  }

  function tesda() {
    const { nome, foto, price, obs} = teste;
    return <div className="Modal">
      <div>
        <img src={foto} className="fotoCar" alt=""></img>
      </div>
      <div>
        {nome}
      </div>
      <div>
        {obs}
      </div>
      <div>
        {price}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
      <label>Quantidade:</label><input className="qtd" type="number" onChange={handleChange}></input>
      </form>
      </div>
      
      <div className="LinkDiv">
      <button className="ButtonsHome" onClick={handleSubmit}>Fazer pedido</button>
      <button className="ButtonsHome" onClick={closeModal}>Voltar</button>
      </div>
    </div>;
  }
  useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((response) => {
        setPost(response.data);
      });
  }, []);

  function addCart(nome:any,quantidade:any,cate:any) {
    console.log(nome,qtd,categoria)
    axios.post(`${URLpost}?nome=${nome}&quantidade=${quantidade}&tipoProduto=${cate}`,{headers: {"Access-Control-Allow-Origin": "http://localhost:3000",},})

  }

  return (
    <div className="App">
      <Link to="/carrinho" className="Link">
        <button className="ButtonCart"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
</button>
      </Link>
      {post?.map((post: any) => {
        return (
          <div>
            <div className="Categoria">
              <div className="titulo">{post.id}</div>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentElement={tesda}
                shouldCloseOnOverlayClick={false}
              ></Modal>
              <div className="listaProdutos">
                {post?.Itens?.map((item: any) => {
                  return (
                    <>
                      <div
                        className="produto"
                        onClick={() => {
                          openModal();
                          setTeste(item);
                          setCategoria(post.id);
                        }}
                      >
                        <img src={item.foto} className="foto" alt=""></img>
                        <div className="infoProd">
                          <div className="prodName">{item.nome}</div>
                          <div className="prodObs">{item.obs}</div>
                          <div className="prodPrice">R${item.price}</div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Menu;
