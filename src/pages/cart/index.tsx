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

const baseURL = "http://localhost:8080/mesa/carrinho";
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
          "Authorization": "$2a$10$xCIhMLLwy9TKplZ6ANsft.pjgYE8XXSoFC4WKI5B5N0O9e8keKtQ2",
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
          "Authorization": "$2a$10$xCIhMLLwy9TKplZ6ANsft.pjgYE8XXSoFC4WKI5B5N0O9e8keKtQ2"
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
  function deleteItem(id:number){
    console.log(`${baseURL}/${id}`)
    axios.delete(`${baseURL}/${id}`, {headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Authorization": "$2a$10$xCIhMLLwy9TKplZ6ANsft.pjgYE8XXSoFC4WKI5B5N0O9e8keKtQ2"
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
                          <button className="ButtonsHome" onClick={() => deleteItem(item?.mesaProdutoId)}></button>
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
