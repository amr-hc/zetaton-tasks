const express = require('express');
const {deleteByid,getByid,getAllPhotos,upload, savePhoto} = require('../controller/photos.controller');



const router = express.Router();


router.route('/photos')
        .get(getAllPhotos)
        .post(upload.single("photo"),savePhoto)
        

router.route('photos/:id').get(getByid).delete(deleteByid)





module.exports=router;