import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { DeleteButton,TrashIcon } from "./styles";
import QRCode from "react-qr-code";

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

const baseURL = "http://localhost:8080/mesa/carrinho";
const URLbase = "http://localhost:8080/payment"
function Cart() {
  const [post, setPost] = useState<any>([]);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [flag,setFlag] = useState<boolean>(false);
  const [total,setTotal] = useState<any>("");
  const [qrCode,setQrCode] = useState<any>("");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Authorization": localStorage.getItem("mesaValueKey"),
        },
      })
      .then((response) => {
        const teste = Object.keys(response.data).map((key:string)=> {
          return  {name:key,elements:response.data[key]};
        });
        
        setPost(response.data.produtos);
        setTotal(response.data.valorTotal)
        setFlag(false);
      });
  }, [flag]);

  function limpaCarrinho(){
    axios.delete(baseURL, {headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Authorization": localStorage.getItem("mesaValueKey")
        }
  }).then((response) => {setFlag(true)})}

  function deleteTable(){
     axios.delete("http://localhost:8080/mesa",{headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Authorization": localStorage.getItem("mesaValueKey")
     }}).then((response) => {window.location.reload();localStorage.setItem("mesaValueKey","");})
  }

  function fazUmPix(){

    axios.post(`${URLbase}?valor=${total}`,null, {headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Authorization": localStorage.getItem("mesaValueKey")
        }
  }).then((response) => {setQrCode(response.data);setIsOpen(true)},)}

  function pixCode() {
    return <div className="Modal">
      <div className="ModalQr">
        <QRCode size={300} value={qrCode} />
        <button className="ButtonsHome" onClick={() => {navigator.clipboard.writeText("teste");alert("copiado!");deleteTable()}}>Copiar código</button>
      </div>
    </div>;
  }
  function deleteItem(id:number){
    axios.delete(`${baseURL}/${id}`, {headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Authorization": localStorage.getItem("mesaValueKey")
    }
}).then((response) => {setFlag(true)})}

  return (
    <div className="App">
        <Link to="/menu" className="Link">
        <button className="ButtonCart"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
</svg>

</button>
      </Link>

          <div>
            <div className="Categoria">
            <div className="titulo">Carrinho</div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentElement={pixCode}
                shouldCloseOnOverlayClick={true}
              ></Modal>
              <div className="listaProdutos">
                  {post?.map((item: any) => {
                    var valorCor = parseFloat(item.valor).toFixed(2);
                    return (
                        <div className="produto">
                        <div className="infoProd">
                          <div className="prodName">{item?.nome}</div>
                          {item?.observacoes?<div className="prodObs">{item?.observacoes}</div>:null}
                          {item?.precoQuantidade?<div className="prodPrice">R${item?.precoQuantidade}</div>: null}
                          <DeleteButton className="ButtonsHome" onClick={() => deleteItem(item?.mesaProdutoId)}><TrashIcon /></DeleteButton>
                        </div>
                        </div>
                    );
                  })}
                  {total ? <div className="valorTotal">Valor Total: R${total}</div> : null}
                  <button className='ButtonsHome' onClick={fazUmPix}>Efetuar Pagamento</button>
                  <button className='ButtonsHome' onClick={limpaCarrinho}>Limpar carrinho</button>
              </div>
            </div>
          </div>
    </div>
  );
}

export default Cart;
