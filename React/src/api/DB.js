import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
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

const deleteFromFavorites = async (idToDelete) => {
  try {
    const docRef = doc(firestore, "users", JSON.parse(localStorage.getItem('user')).uid);
    
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        favorite: arrayRemove(idToDelete)
      });
      
      console.log("ID deleted from favorites successfully.");
    } else {
      console.log("User document not found.");
    }
  } catch (error) {
    console.error("Error deleting ID from favorites:", error);
  }
};

export { getFavoriteImages, addToFavorites, deleteFromFavorites };

