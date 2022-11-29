import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import {getCardapio} from '../../scripts/firestoreScripts'

const baseURL = "http://localhost:3000/mesa/carrinho";
function Cart() {
  const [post, setPost] = useState<any>([]);
  const [flag,setFlag] = useState<boolean>(false);

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
      });
  }, [flag]);

  function limpaCarrinho(){
    axios.delete(baseURL, {headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        }
  }).then((response) => {alert(response);setFlag(true)})}

  function fazUmPix(){
    axios.get(baseURL, {headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        }
  }).then((response) => {alert(response);setFlag(true)})}


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
              <div className="listaProdutos">
                  {post?.map((item: any) => {
                    console.log(post);
                    var valorCor = parseFloat(item.valor).toFixed(2);
                    console.log("")
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
                  <button className='ButtonsHome'>Efetuar Pagamento</button>
                  <button className='ButtonsHome' onClick={limpaCarrinho}>Limpar carrinho</button>
              </div>
            </div>
          </div>
    </div>
  );
}

export default Cart;
