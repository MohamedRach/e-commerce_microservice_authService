require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const routes = require("./routes/routes")
mongoose.connect( process.env.dbURI)
    .then(() => {
        console.log("db connected successfully")
        app.listen("7070" , () => {
            console.log("listening on port 7070")
        })
    }).catch((err) => console.log(err))

app.use(express.json())



app.use(routes)

