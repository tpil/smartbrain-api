const express = require('express');
//const bodyParser = require('body-parser'); Everytime we get JSON from broswers we need to parse it. 
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//Connection to database using knex
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //localhost
      user : 'postgres',
      password : 'liakos100',
      database : 'smart_brain'
    }
  });



const app = express();
//Middelwares
app.use(express.json()); //new express has express().json to pasrse JSON data
app.use(cors());



app.get('/',(req,res)=>{
   // res.send(console.log('success'));
   res.send({})
});

app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)});

app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)});

//we pass params to req
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)});

app.put('/image', (req,res) => {image.handleImage(req,res,db)});

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)});

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
});

