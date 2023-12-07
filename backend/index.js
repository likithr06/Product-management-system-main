const express = require('express');
const cors = require('cors');
const router = require('./routes')
const connectDb = require('./db')

const app = express();

app.use(cors());
app.use(express.json())

app.use('/',router)

//port number
const port = 5000;

//connection to database
connectDb().then(() => {
    app.listen(port,(req,res)=>{
        console.log("server running at port:",port);
    });
});


app.use('/',(req,res)=>{
    res.send("server running...")
})
