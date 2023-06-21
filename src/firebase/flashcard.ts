import {getDoc, setDoc, doc, collection, getDocs, query, where, deleteDoc} from "firebase/firestore";

import {db} from "./firebase";

export interface Card {
    id: string,
    front: string,
    back: string,
    deck: string,
    wrong: boolean

}

export const getCards = async () => {
    try {
        const q = query(collection(db, "cards"));
        const querySnapshot = await getDocs(q);
        const cards: Card[] = [];
        querySnapshot.forEach((doc) => {
            const card = doc.data() as Card;
            
            cards.push(card);
        });
        return cards;
    }
    catch(e) {
        console.log(e);
    }
}

export const getDeckList = async () => {
    try {
        const q = query(collection(db, "decks"));
        const querySnapshot = await getDocs(q);
        const decks: string[] = [];
        querySnapshot.forEach((doc) => {
            const deck = doc.data().name as string;
            decks.push(deck);
        });
        return decks;
    }
    catch(e) {
        console.log(e);
    }
}

export const addDeck = async (deck: string) => {
    try {
        await setDoc(doc(db, "decks", deck), {name: deck});
    }
    catch(e) {
        console.log(e);
    }
}
export const getCardsByDeck = async (deck: string) => {
    try {
        const q = query(collection(db, "cards"), where("deck", "==", deck));
        const querySnapshot = await getDocs(q);
        const cards: Card[] = [];
        querySnapshot.forEach((doc) => {
            const card = doc.data() as Card;
            cards.push(card);
        });
        return cards;
    }
    catch(e) {
        console.log(e);
    }
}
export const createCard = async (card: Card) => {
    try {

        await setDoc(doc(db, "cards", card.id), card);
    }
    catch(e) {
        console.log(e);
    }
}

export const deleteCard = async (card: Card) => {
    try {

        await deleteDoc(doc(db, "cards", card.id));
    }
    catch(e) {
        console.log(e);
    }
}

export const updateCard = async (card: Card) => {
    try {

        await setDoc(doc(db, "cards", card.id), card, {merge: true});
    }
    catch(e) {
        console.log(e);
    }
}

export const getWrongCards = async () => {
    try {
        const q = query(collection(db, "cards"), where("wrong", "==", true));
        const querySnapshot = await getDocs(q);
        const cards: Card[] = [];
        querySnapshot.forEach((doc) => {
            const card = doc.data() as Card;
            cards.push(card);
        });
        return cards;
    }
    catch(e) {
        console.log(e);
    }
}
export const getWrongCardsByDeck = async (deck:string) => {
    try {
        const q = query(collection(db, "cards"), where("wrong", "==", true), where("deck", "==", deck));
        const querySnapshot = await getDocs(q);
        const cards: Card[] = [];
        querySnapshot.forEach((doc) => {
            const card = doc.data() as Card;
            cards.push(card);
        });
        return cards;
    }
    catch(e) {
        console.log(e);
    }
}

export const resetWrongCardsByDeck = async (deck:string) => {
    try {
        const q = query(collection(db, "cards"), where("wrong", "==", true), where("deck", "==", deck));
        const querySnapshot = await getDocs(q);
        const cards: Card[] = [];
        querySnapshot.forEach((doc) => {
            const card = doc.data() as Card;
            card.wrong = false;
            updateCard(card);
        });
        return cards;
    }
    catch(e) {
        console.log(e);
    }
}

export const resetWrongCards = async () => {
    try {
        const q = query(collection(db, "cards"), where("wrong", "==", true));
        const querySnapshot = await getDocs(q);
        const cards: Card[] = [];
        querySnapshot.forEach((doc) => {
            const card = doc.data() as Card;
            card.wrong = false;
            updateCard(card);
        });
        return cards;
    }
    catch(e) {
        console.log(e);
    }
}