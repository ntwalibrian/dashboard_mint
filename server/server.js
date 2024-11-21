const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')


const app = express()

app.use(express.static(path.join(__dirname,"public")))
app.use(cors())
app.use(express.json())

const port = 3001

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mint"
})

app.post('/add_listing',(req,res) =>{
    sql = "INSERT INTO stock_listing (`symbol`, `name`, `price`, `in_stock_amount`) VALUES(?,?,?,?)"
    const values = [
        req.body.symbol,
        req.body.name,
        req.body.price,
        req.body.amount
    ]
    db.query(sql,values, (err, result) => {
        if(err) return res.json({message: 'error ocured' + err})
        return res.json({success:"succesfully registered"})
    })
})


app.listen(port, () => {
    console.log('on line now')
})