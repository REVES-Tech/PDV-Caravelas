import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import { textSpanEnd } from 'typescript';
//import {getCardapio} from '../../scripts/firestoreScripts'


const baseURL = "http://localhost:3000/Cardapio";
function  Menu() {
  const [post, setPost] = useState<any>([]);
  const [item, setItem] = useState<any>([]);

  useEffect(() => {
    axios.get(baseURL,{headers: {                  
      "Access-Control-Allow-Origin": "http://localhost:3000"}}).then((response) => {
      setPost(response.data);
    });
  }, []);
  
    return (
      <div className="App">
        {post?.map((post: any) => {
          return(
          <div>
            <div className='Categoria'>
              <div className='titulo'>{post.id}</div>
              <div className='listaProdutos'>
              <div className='produto'>{Object.keys(post)}
              
              </div>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    );
  }
  
  export default Menu;