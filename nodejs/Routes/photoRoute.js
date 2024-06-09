const express = require('express');
const {deleteByid,getByid,getAllPhotos,upload, savePhoto, savePhotoShortLink} = require('../controller/photos.controller');



const router = express.Router();



router.route('/photos')
        .get(getAllPhotos)
        .post(upload.single("photo"),savePhoto)

router.route('/photos/:id').get(getByid).delete(deleteByid)

        
router.route('/photoshort')
        .post(upload.single("photo"),savePhotoShortLink)
        



module.exports=router;