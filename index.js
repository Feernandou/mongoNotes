const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {Schema,model} = require("mongoose")
const db = mongoose.connection
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
db.once("open",()=>{
    console.log("Conetado a la base de datos")
})
db.on("error",()=>{
    console.log("Error")
})


const noteSchema = new Schema({
    titulo:String,
    contenido:String
})
const Note = model("Nota",noteSchema)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")

app.get("/",async (req,res)=>{
    const notas = await Note.find()
    res.render("index",{notas})
    

})
app.post("/enviar", async (req,res)=>{
    const {titulo,contenido} = req.body
    const nota = new Note({
        titulo:titulo,
        contenido:contenido
    })
    await nota.save()
    res.redirect("/")
})
app.listen(3000,()=>{
    console.log("Server en linea")
})

