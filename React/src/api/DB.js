import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../common/firebase";

const getFavoriteImages = async () => {
  const docRef = doc(firestore, "users", JSON.parse(localStorage.getItem('user')).uid);
  
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data().favorite;
  } else {
    console.log("no document");
    return [];
  }
};

export { getFavoriteImages };
