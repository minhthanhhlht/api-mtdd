const mysql = require('mysql');
const express = require('express');
const cors = require("cors");
// const http = require('http');
const fs = require('fs');
var app = express();
const bodyParser = require('body-parser');
const PORT = 9000;

// http.createServer((req, res) => {
//     fs.readFile('index.html', 'utf-8', (err, content) => {
//       if (err) {
//         console.log('We cannot open "index.html" file.')
//       }
//       res.writeHead(200, {
//         'Content-Type': 'text/html; charset=utf-8',
//       })

//       res.end(content)
//     })
//   })
//   .listen(PORT, () => {
//     console.log('Server listening on: ', PORT)
// })

app.use(cors())
app.use(bodyParser.json());


var mysqlConnection = mysql.createConnection({
    host     : '14.225.192.113',
    user     : 'admin',
    password : 'MinhThanh6021',
    database : 'api-mtdd'
    // host     : '127.0.0.1',
    // user     : 'root',
    // password : '',
    // database : 'api-mtdd'

});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Database connection success.');
    } else {
        console.log('Database connection error:'+ JSON.stringify(err, undefined, 2));
    }
});

app.listen(PORT,() => console.log(`Express server listening on: ${PORT}`));

// Get All Products
app.get('/api/products', (req, res) => {    
    mysqlConnection.query('SELECT * FROM products', (err, rows, fields)=> {
        
        if (!err) {            
            res.send(rows);
        } else {
            console.log(err);
        }
    })
    
});

// Get a Products
app.get('/api/products/:id', (req, res) => {    
    mysqlConnection.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, rows, fields)=> {
        
        if (!err) {            
            res.send(rows);
        } else {
            console.log("Không tìm thấy sản phẩm.");
        }
    })
    
});

// // Delete a Products
// app.get('/api/products', (req, res) => {    
//     mysqlConnection.query('SELECT * FROM products', (err, rows, fields)=> {
        
//         if (!err) {            
//             res.send(rows);
//         } else {
//             console.log(err);
//         }
//     })
    
// });