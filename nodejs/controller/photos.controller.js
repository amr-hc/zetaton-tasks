const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject, listAll } = require("firebase/storage");
const { getFirestore, collection, addDoc, deleteDoc, doc, getDoc, getDocs,updateDoc,setDoc } = require("firebase/firestore");
const multer = require("multer");
const config = require("../config/firebase.config");
const axios = require('axios');

initializeApp(config.firebaseConfig);

const storage = getStorage();
const db = getFirestore();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Can upload images only"), false);
    }
};

module.exports.upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: multerFilter
});

axios.defaults.headers.common['User-Agent'] = '';

async function shortenLink(urlToShorten) {
    const apiUrl = `https://www.shareaholic.com/v2/share/shorten_link?apikey=af144d8e61ca102ee21df905ef5914ff&url=${encodeURIComponent(urlToShorten)}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to shorten link");
    }
}

module.exports.savePhoto = async (req, res, next) => {
    try {
        const newDocRef = doc(collection(db, "photos"));

        const docId = newDocRef.id;

        const storageRef = ref(storage, `photos/${docId}.${req.file.originalname.split('.').pop()}`);
        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const url = await getDownloadURL(snapshot.ref);

        await setDoc(newDocRef, {
            path: storageRef._location.path_,
            url,
        });

        res.send({
            message: 'File uploaded to Firebase storage',
            url,
            id: docId
        });
    } catch (error) {
        next(error);
    }
};


module.exports.savePhotoShortLink = async (req, res, next) => {
    try {
        const newDocRef = doc(collection(db, "photos"));

        const docId = newDocRef.id;

        const storageRef = ref(storage, `photos/${docId}.${req.file.originalname.split('.').pop()}`);
        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const url = await getDownloadURL(snapshot.ref);
        const shortURL = await shortenLink(url);
        await setDoc(newDocRef, {
            path: storageRef._location.path_,
            shortURL
        });

        res.send({
            message: 'File uploaded to Firebase storage',
            shortURL,
            id: docId
        });
    } catch (error) {
        next(error);
    }
};


module.exports.deleteByid = async (req, res, next) => {
    try {
        const photoRef = doc(collection(db, "photos"), req.params.id);
        let docSnap = await getDoc(photoRef);
        if (!docSnap.exists) {
            throw new Error("No such document");
        }
        docSnap = docSnap.data();

        const desertRef = ref(storage, docSnap.path);
        await deleteDoc(photoRef);
        await deleteObject(desertRef);
        res.status(200).send("deleted successfully");
    } catch (error) {
        next(error); 
    }
};

module.exports.getAllPhotos = async (req, res, next) => {
    try {
        const photosCollection = collection(db, "photos");
        const querySnapshot = await getDocs(photosCollection);
        const photosData = [];
        querySnapshot.forEach(doc => {
            photosData.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(photosData);
    } catch (error) {
        next(error); 
    }
};

module.exports.getByid = async (req, res, next) => {
    try {
        const photoRef = doc(collection(db, "photos"), req.params.id);
        const docSnap = await getDoc(photoRef);
        if (!docSnap.exists) {
            throw new Error("No such document");
        }
        res.status(200).send(docSnap.data());
    } catch (error) {
        next(error); 
    }
};

