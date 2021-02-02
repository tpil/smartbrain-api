const handleProfileGet = (req,res, db)=>{
    const {id} =req.params;
  
    //using knet doc to retreive user prodile from db
    db.select('*').from('users').where({
        id:id
    })
    .then(user=>{
        if (user.length){
             res.json(user[0]);//knex returns table so we get only the value
        }else{
            res.status(400).json('Not found')
        }
    })
   .catch(err=>{res.status(400).json('error getting user')});

}

module.exports = {
    handleProfileGet: handleProfileGet
}