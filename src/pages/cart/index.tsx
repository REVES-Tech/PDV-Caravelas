import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

const baseURL = "http://localhost:3000/mesa/carrinho";
const URLbase = "http://localhost:3000/payment"
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
        },
      })
      .then((response) => {
        console.log(response.data)
        setPost(response.data);
        setFlag(false);
        setTotal(response.data.slice(-1));
      });
  }, [flag]);

  function limpaCarrinho(){
    axios.delete(baseURL, {headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        }
  }).then((response) => {setFlag(true)})}

  function fazUmPix(){
    axios.post(`${URLbase}?valor=${total}`, {headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        }
  }).then((response) => {setQrCode(response.data);console.log(response.data);setIsOpen(true)},)}

  function pixCode() {
    return <div className="Modal">
      <div className="ModalQr">
        <img src={"data:image/gif;base64,"+qrCode[0]} className="myQrCode" alt=""></img>
        <button className="ButtonsHome" onClick={() => {navigator.clipboard.writeText(qrCode[1]);alert("copiado!")}}>Copiar código</button>
      </div>
    </div>;
  }

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
                          <div className="prodObs">{item?.quantidade}</div>
                          {item.valor?<div className="prodPrice">R${valorCor}</div>: null}
                          {item.valorTotal ? <div className="valorTotal">Valor Total: R${item.valorTotal}</div> : null}
                        </div>
                        </div>
                    );
                  })}
                  <button className='ButtonsHome' onClick={fazUmPix}>Efetuar Pagamento</button>
                  <button className='ButtonsHome' onClick={limpaCarrinho}>Limpar carrinho</button>
              </div>
            </div>
          </div>
    </div>
  );
}

export default Cart;
