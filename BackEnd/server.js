const express = require('express');
const path = require('path');
const res = require("express/lib/response");
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy
//const bycrpt = require('bcrypt');

const url = 'mongodb+srv://simoniniar:arsim@cluster0.jasnw.mongodb.net/';

const connection = new MongoClient(url);

const app = express();

const cors = require('cors');
app.use(cors());


const

    dir  = "public/",
    port = 3000

const users = [];

const GITHUB_CLIENT_ID = "Ov23liBXrySMUvfRX8sK";
const GITHUB_CLIENT_SECRET = "36d4a0c1b6cbe8386c6204c64f26ed6aa656e5dd";
const GITHUB_CALLBACK_URL = "http://localhost:3000/auth/github/callback"


passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
    },
    function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile);
    }
));




passport.serializeUser(function(user, done) {
    done(null, user);
});

//See comment above.
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});



app.use(express.json());

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }));




app.get('/table', async (req, res) => {
    //console.log("Table: " + appdata)
    const data = await getData(req)
    res.status(200).json(data)
})

app.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        if(await checkUsers(req) === -1) {
            console.log("User already exists")
        }
        else {
            await insertUserData(req);
            //res.redirect('/login.html');
            res.status(200).end()
        }
    } catch {
        console.log('Error creating user');
        res.redirect('/register.html');
    }
})

app.post('/login', async (req, res) => {
    //console.log(req.body)
    let data = await checkLogin(req)
    try {
        if(data === -1) {
            console.log("User Doesn't Exist")
        }
        else {
            console.log("Officially Logged In")
            res.status(200).json(data)

        }
    } catch {
        console.log('Error creating user');
        res.redirect('/register.html');
    }
})


app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res) {
        console.log("Made it Here")
    }
    );

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log("Made it Here")
        res.redirect('/');
    });

app.post('/submit', (req, res) => {

    console.log(req.body)
    //appdata.push(req.body);
    insertNewData(req);
    res.status(200).end()


})

app.put('/update/:id', (req, res) => {
    //appdata = req.body;


    //Sends to Client

    updateData(req);
    res.status(200).end()

})

app.delete('/delete/:id', (req, res) => {
    //appdata = req.body;


    //Sends to Client
    deleteData(req);
    res.status(200).end()

})

const appRun = run();

// port - whenever is port number, () - do this function
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



async function run() {
    await connection.connect().then(()=> console.log("connected to the server"))
}

async function insertNewData(req) {
    const collection = await connection.db("testDB").collection("testDBCollection");
    await collection.insertOne(req.body)
}

async function insertUserData(req) {
    const collection = await connection.db("testDB").collection("userCollection");
    await collection.insertOne(req.body)
}

async function checkUsers(req) {
    const collection = await connection.db("testDB").collection("userCollection");

    const query = {"username": req.body.username}
    console.log("Query is: ", query)

    const found = await collection.findOne(query, {})

    console.log("Found is: ", found)
    if (found === null) {
        console.log("User doesn't exists")
        return 0
    }
    else {
        console.log("User does exist")
        return -1
    }
}

async function checkLogin(req) {
    const collection = await connection.db("testDB").collection("userCollection");

    const query = {"username": req.body.username, password: req.body.password}
    console.log("Query is: ", query)


    const found = await collection.findOne(query, {})

    if (found !== null) {
        console.log("UserName and Password is in the database")
        return query
    }
    else {
        console.log("UserName is not in database")
        return -1
    }


}

async function updateData(req) {
    const collection = await connection.db("testDB").collection("testDBCollection");

    //collection.drop();

    //collection.findOne({ "_id" : req.params.id })
    collection.findOneAndUpdate({ "_id" : req.params.id}, {$set: req.body})
}

async function deleteData(req) {
    const collection = await connection.db("testDB").collection("testDBCollection");
    collection.findOneAndDelete({ "_id" : req.params.id})
}

async function getData(req) {
    const collection = await connection.db("testDB").collection("testDBCollection");

    console.log(collection.find().toArray())
    return await collection.find().toArray()
}