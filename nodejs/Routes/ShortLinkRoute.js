const express = require('express');
const {shortlink} = require('../controller/short.controller');
const shortLinkValidation = require('../Midelwares/validations/shortLinkValidation');
const validatorResult = require('./../Midelwares/validations/validatorResult');




const router = express.Router();


router.route('/short')
        .post(shortLinkValidation.insert,validatorResult,shortlink)
        






module.exports=router;