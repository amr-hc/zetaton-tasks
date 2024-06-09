import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../common/firebase";
import { updateDoc, arrayUnion } from "firebase/firestore";

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

const addToFavorites = async (idToAdd) => {
  try {
    const docRef = doc(firestore, "users", JSON.parse(localStorage.getItem('user')).uid);
    
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        favorite: arrayUnion(idToAdd)
      });
      
      console.log("ID added to favorites successfully.");
    } else {
      console.log("User document not found.");
    }
  } catch (error) {
    console.error("Error adding ID to favorites:", error);
  }
};


export { getFavoriteImages, addToFavorites };
