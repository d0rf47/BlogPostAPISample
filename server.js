const express = require('express');
const cors = require("cors");
const apiRoute = require('./routes/api');
const PORT = process.env.PORT || 5000;
const app = express();
const corsOption = {};
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());
app.use("/api", cors(corsOption), apiRoute);


app.listen(PORT, async (err) =>
{    
    if(err)
        console.log(err);
    else
        console.log(`Server Listening on Port ${PORT}`);                    
});