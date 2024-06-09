const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } = require("firebase/storage");
const { getFirestore, collection, addDoc, deleteDoc, doc, getDoc, getDocs } = require("firebase/firestore");
const config = require("../config/firebase.config");
const axios = require('axios');

initializeApp(config.firebaseConfig);

const storage = getStorage();
const db = getFirestore();

axios.defaults.headers.common['User-Agent'] = '';

async function shortenLink(urlToShorten) {
    const apiUrl = `https://www.shareaholic.com/v2/share/shorten_link?apikey=af144d8e61ca102ee21df905ef5914ff&url=${encodeURIComponent(urlToShorten)}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data.data;
    } catch (error) {
        
      next(error);
    }
}

module.exports.shortlink = async (req, res, next) => {
    try {
        const shortURL = await shortenLink(req.body.url);
        res.send({
            message: 'Short Link Done',
            shortURL: shortURL
        });
    } catch (error) {
        next(error); 
    }
};



