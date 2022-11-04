//import { db } from "./FirestoreConnection/firestoreConnection";
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAXhGjkUWSACT_z0uzbLy_UUvxSboNP66g",
  authDomain: "pdvzin.firebaseapp.com",
  projectId: "pdvzin",
  storageBucket: "pdvzin.appspot.com",
  messagingSenderId: "774233720815",
  appId: "1:774233720815:web:feec5dc19e10069b34181a",
  measurementId: "G-NQQC82NBYF"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const querySnapshot = await getDocs(collection(db, "Cardapio"));

export async function getCardapio(){
    const querySnapshot = await getDocs(collection(db, "products"));
    var data = [];
    querySnapshot.forEach((doc) => {
      let productData = {
        id: doc.id,
        data: doc.data()
      }
      data.push(productData)
    })
    return data;
}