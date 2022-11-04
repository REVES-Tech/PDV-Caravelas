import { db } from "./FirestoreConnection/firestoreConnection";

async function getCardapio(){
    const cardapioRef = database.collection('Cardapio');
        const cardapioDoc = await cardapioRef.get();

        const cardapio = [];

        cardapioDoc.forEach(doc => cardapio.push({ id: doc.id, ...doc.data() }))
        return cardapio;
};

