const mysql = require("mysql2");
const db = require("../database/data");
const { Console } = require("console");

const getDataS = (req, res) =>{
    const sql = "SELECT * FROM SHOP";
    db.query(sql, (err,data) =>{
        if(err){
            console.log("error ehile fetching data");
            res.status(401)
                .json({message:"Error occured while fetching data"})
        }else{
            res.json(data);
        }
    })
}

const getData = (req, res) =>{
    const id= req.params.id;
    const sql = "SELECT * FROM SHOP where id = ?";
    db.query(sql,[id],(err,data) =>{
        if(err){
            console.log("error ehile fetching data");
            res.status(401)
                .json({message:"Error occured while fetching data"})
        }else{
            res.json(data);
        }
    })
}

const createData = (req , res )=> {
    const { Name , Description , Price , Quantity } = req.body;
    console.log( Name , Description , Price , Quantity );
    const sql = "insert into shop (Name , Description ,Price , Quantity) VALUES (?,?,?,?)";
    db.query(sql , [Name , Description, Price , Quantity] , (err, data) => {
        if(err){
            console.log(err);
            res.status(401).json({message:"error while inserting data"})
        }else{
            res.json({message:"data inserted succesfully"});
        }
    })
}

const deleteData = (req, res) =>{
    const id= req.params.id;
    const sql = "delete FROM shop where id = ?";
    db.query(sql,[id],(err,data) =>{
        if(err){
            console.log("error ehile deleting data");
            res.status(401)
                .json({message:"Error occured while deleting data"})
        }else{
            res.json({message:"data deleted succesfully"});
        }
    })
}

const updataData = (req, res) => {
    const { Name, Description, Price, Quantity } = req.body;
    const id = req.params.id;
    console.log("Request Payload:", req.body); // Log the entire request payload
    console.log("Quantity:", Quantity);
    
    if (Quantity === null || Quantity === undefined) {
        return res.status(400).json({ Error: "Quantity cannot be null or undefined" });
    }

    const sql = "UPDATE shop SET Quantity = ? WHERE id = ?";
    db.query(sql, [Quantity, id], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ Error: "Internal Server Error" });
        } else {
            console.log("Update Successful");
            res.json(data);
        }
    });
};

module.exports = {getData ,getDataS , createData , deleteData , updataData}