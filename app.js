const express = require("express");
const cors= require("cors");
const path = require("path");
const bodyParser = require("body-parser")
const dataController = require("./controllers/dataController")
const app= express();
app.use(cors());
app.use(bodyParser.json())
const port = 3000;

app.use(express.static(path.join(__dirname,"public")))
app.get("/", (req , res) =>{
    res.sendFile(path.join(__dirname,"public","dashboard.html"));
})

app.get("/data" , dataController.getDataS);
app.get("/data/:id",dataController.getData);
app.post("/data", dataController.createData);
app.delete("/data/:id",dataController.deleteData);
app.put("/data/:id",dataController.updataData);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.listen(port,()=>{
    console.log("server running");
})