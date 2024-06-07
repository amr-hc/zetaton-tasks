const express = require("express");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject ,listAll } = require("firebase/storage");
const { getFirestore, collection, addDoc,deleteDoc ,doc,getDoc,getDocs } = require("firebase/firestore");

const multer = require("multer");
const config = require("../config/firebase.config");

const axios = require('axios');



initializeApp(config.firebaseConfig);

const storage = getStorage();
const db = getFirestore();

const multerFilter = (req, file, cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null, true);
  }else{
    cb(new Error("Can upload images only"), false);
  }

};

module.exports.upload = multer(
  { storage: multer.memoryStorage(),
  fileFilter : multerFilter
 });


axios.defaults.headers.common['User-Agent'] = '';

async function shortenLink(urlToShorten) {
  const apiUrl = `https://www.shareaholic.com/v2/share/shorten_link?apikey=af144d8e61ca102ee21df905ef5914ff&url=${encodeURIComponent(urlToShorten)}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}


module.exports.savePhoto= async (req, res) => {
    try {
        const currentDate = new Date();
        const storageRef = ref(storage, `photos/${req.file.originalname + currentDate.toUTCString()}`);
        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const url = await getDownloadURL(snapshot.ref);


        const shortURL= await shortenLink(url)

        const docRef = await addDoc(collection(db, "photos"), {
          path: storageRef._location.path_,
          url,
          shortURL,
        });
    
        return res.send({
            message: 'file uploaded to firebase storage',
            url,
            id: docRef.id
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
};



module.exports.deleteByid = async (req, res) => {
  const photoRef = doc(collection(db, "photos"), req.params.id);
  let docSnap = await getDoc(photoRef);
  if (!docSnap.exists) {
    return res.status(400).send("No such document");
  }
  docSnap = docSnap.data();

  const desertRef = ref(storage,docSnap.path);
  await deleteDoc(photoRef);
  await deleteObject(desertRef);
  return res.status(200).send("deleted successfully")
};

module.exports.getAllPhotos = async (req, res) => {
  try {
    const photosCollection = collection(db, "photos");
    const querySnapshot = await getDocs(photosCollection);
    
    const photosData = [];
    querySnapshot.forEach(doc => {
      photosData.push(doc.data());
    });

    return res.status(200).json(photosData);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};


module.exports.getByid = async (req, res) => {
  const photoRef = doc(collection(db, "photos"), req.params.id);
  let docSnap = await getDoc(photoRef);
  if (!docSnap.exists) {
    return res.status(400).send("No such document");
  }

  return res.status(200).send(docSnap.data());
};

