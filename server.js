const express = require("express")
const mysql = require("mysql")
const cors = require('cors');
const { createConnection } = require("net");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "login"
})

app.post('/signup',(req,res) => {
     const sql = "INSERT INTO login_data (`Name`,`email`,`password`,`mobile`) VALUES (?)";
     const values = [
        req.body.Name,
        req.body.email,
        req.body.password,
        req.body.mobile

     ]
     db.query(sql,[values],(err,data) => {
        if(err){
            return res.json("Error")
        }
        return res.json(data);
     })
})

app.post('/login',(req,res) => {
    const sql = "SELECT * FROM login_data WHERE `email` = ? AND `password` = ?";
   
    db.query(sql,[req.body.email,req.body.password],(err,data) => {
       if(err){
           return res.json("Error")
       }
       if(data.length>0){
        return res.json("Success");
       }
       else{
        return res.json("Fail");
       }
    })
})

app.get('/users', (req, res) => {
    const { email } = req.query;
    const sql = `SELECT * FROM login_data WHERE email = ?`;
    
    db.query(sql, [email], (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json(data);
    });
  });

app.listen(8085,()=> {
    console.log("listening");
})