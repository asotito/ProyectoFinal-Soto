import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { app } from "./config"

const db = getFirestore(app);

export const getItems = async (setProductData) => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const products = [];

    querySnapshot.forEach((doc) => {
        products.push(doc.data());
    });

    setProductData(products);
}

export const getItemsByCategory = async (setProductData, categoryId) => {
    const q = query(collection(db, "items"), where("category", "==", categoryId));

    const querySnapshot = await getDocs(q);
    const products = [];

    querySnapshot.forEach((doc) => {
        products.push(doc.data());
    });

    setProductData(products);
}

export const getItem = async(setProduct, id) => {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);

    setProduct(docSnap.data());
}