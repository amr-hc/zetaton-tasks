const express = require('express');
const photosRouter = require('./Routes/photoRoute');



const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
})


app.get('/', (req, res) => {
    res.send('Welcome to Task')
})

app.use(photosRouter);


app.use((error,request,response,next)=>{
    response.status(500).json({data:`Error MW ${error}`})
});
