const Clarifai = require('clarifai');

//Moved to Back-End so its hidden from headers req
const app = new Clarifai.App({apiKey: '1eab0b351fac408285831bc6c61e6b9f'});

const handleApiCall = (req,res) =>{
  
//app.models.predict({id: 'c0c0ac362b03416da06ab3fa36fb58e3'},req.body.input)
//app.models.predict({id: 'd02b4508df58432fbb84e800597b8959'},req.body.input)
console.log('the image URL is:',req.body.imageURL);
app.models.predict({id:'d02b4508df58432fbb84e800597b8959' },req.body.imageURL)
                .then(data=>{
                   res.json(data);
                })
                .catch(err=> res.status(400).json(err));
}
const handleImage = (req,res,db)=>{
    const {id} =req.body;
    //using knex increment() to increase the number of entries
   db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
      res.json(entries[0]);
    })
    .catch(err=>{ res.status(400).json('unable to get the enries')});
}
module.exports = {
    handleImage,
    handleApiCall
}