const {body} = require('express-validator');


exports.insert=[
    body("url").isURL().withMessage("URL must be valid"),
]
