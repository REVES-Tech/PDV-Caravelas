import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from '../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Modal from "react-modal";
import { SendButton } from "./styles";

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
const baseLogout = "http://localhost:8080/admin/logout"
function Menu() {
  const [post, setPost] = useState<any>([]);

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [teste, setTeste] = useState<any>("");
  const [itemId,setItemId] = useState<any>("");
  const [qtd, setQtd] = useState<number>(0);
  const [flag, setFlag] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [photo, setPhoto] = useState<string>("");
  const [obs, setObs] = useState<string>("");
  const [tipo, setTipo] = useState<string>("BEBIDA");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  function openModal(id:number) {
    setItemId(id);
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
    window.location.reload(); 
  }

  function logout(){
    axios.post(baseLogout,null,{headers:{
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Authorization": localStorage.getItem("parentValueKey"),
    }})
    navigate('/login');
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

  function handleSubmit(event:any) {
    event.preventDefault();
    addCart(price,photo,name,obs,tipo)
    closeModal();
    setFlag(flag+1)
  }
  function handleDelete(){
    axios.delete(`http://localhost:8080/cardapio/produtos?produtoId=${itemId}`,{headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Authorization": localStorage.getItem("parentValueKey"),
      },}
    )
    closeModal();
  }

  useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((response) => {
        const teste = Object.keys(response.data).map((key:string)=> {
          return  {name:key,elements:response.data[key]};
        });
        setPost(teste);
      });
  }, [flag]);

  function tesda() {
    const { nome, foto, preco, observacoes} = teste;
    return <div className="Modal">
      <div>
        <img src={photo} className="fotoCar" alt=""></img>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
        <label>Name:</label><input className="qtd" value={name} onChange={handleChangeName}></input>
        <label>Obs:</label><input className="qtd" value={obs} onChange={handleChangeObs}></input>
        <label>Price:</label><input className="qtd" value={price} onChange={handleChangePrice}></input>
        <label>Photo:</label><input className="qtd" value={photo} onChange={handleChangePhoto}></input>
      </form>
      </div>
      
      <div className="LinkDiv">
      <button className="ButtonsHome" onClick={handleSubmit}>Atualizar Item</button>
      <button onClick={handleDelete} className="ButtonsHome">Deletar Item</button>
      <button className="ButtonsHome" onClick={closeModal}>Voltar</button>
      </div>
    </div>;
  }


  function addCart(price:number,photo:string,name:string,obs:string,tipo:string) {
    axios.put(URLpost,{
      "id": itemId,
      "tipoProduto": tipo,
      "nome": name,
      "observacoes": obs,
      "preco": price,
      "foto": photo
    },{headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Authorization": localStorage.getItem("parentValueKey"),
    }})

  }

  return (
    <div className="App">
      <Link to="/cardapio" className="Link">
        <button className="ButtonAdd">+
</button>

      </Link>
      {post?.map((post: any) => {
        return (
          <div>
            <div className="Categoria">
              <div className="titulo">{post.name}</div>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentElement={tesda}
                ariaHideApp={false}
                shouldCloseOnOverlayClick={false}
              ></Modal>
              <div className="listaProdutos">
                {post?.elements?.map((item: any) => {
                  return (
                    <>
                      <div
                        className="produto"
                        onClick={() => {
                          setTeste(item);
                          openModal(item.id);
                          setName(item.nome);
                          setObs(item.observacoes);
                          setPrice(item.preco);
                          setPhoto(item.foto);
                        }}
                      >
                        <img src={item.foto} className="foto" alt=""></img>
                        <div className="infoProd">
                          <div className="prodName">{item.nome}</div>
                          <div className="prodObs">{item.observacoes}</div>
                          <div className="prodPrice">R${item.preco}</div>
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
      <SendButton onClick={logout}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></SendButton>
    </div>
  );
}

export default Menu;
