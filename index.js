const express = require('express');
let users = require('./users.json');
const app = express();

const PORT = 8000;

app.use(express.json());

// Listening to port : PORT
app.listen(PORT, () => {
    console.log(`Listening to port : ${PORT}`);
})

// Sending string to '/' route
app.get("/", (req, res) => {
    res.send("Welcome to Home page");
})

// Sending json file to '/users'
app.get("/users", (req, res) => {
    res.json(users);
})

// Sending users base on Params
app.get("/users/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((user) => user.id === Number.parseInt(id));
    res.json(user);
})

// Sending based on Query Params
// app.get("/users", (req, res) => {
//     const {first_name} = req.query;
    
//     const user = users.find((user) => {
//         return user.first_name === first_name
//     })

//     res.json(user || {"404": "Wrond Query"});
// })

app.post("/users", (req, res) => {
    users.push(req.body);
    res.json(req.body);
})

app.patch('/user/:id', (req, res) => {
    const {id} = req.params;
    const data = req.body;
    console.log("Id : ", id);
    console.log("Data : ", data);
    let user = users.find((user) => user.id === Number.parseInt(id));
    console.log(user);
    user = {...user, ...data};
    const index = users.findIndex((p) => p.id === Number.parseInt(id));
    res.json(users.splice(index, 1, user));
})

app.delete('/user/:id', (req, res) => {
    const {id} = req.params;
    const index = users.findIndex((p) => p.id === Number.parseInt(id));
    res.send(
        users.splice(Number.parseInt(index), 1)
    );
})