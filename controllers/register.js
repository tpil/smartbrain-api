const handleRegister = (req,res,db,bcrypt)=>{
    const {name,email,password} = req.body;

    //validation
    if (!name || !email || !password){
       return res.status(400).json('incorrect form submission');// return to leave the function
    }



    const hash = bcrypt.hashSync(password);//passwrod crypt
    
    //Knet doc - we modify the database so we use transaction to recover from any failure during register
    db.transaction(trx=>{
        trx.insert({
            hash: hash,
            email:email
        })
        .into('login')
        .returning('email') //returning method returns what we just inserted
        .then(loginEmail =>{

         return  trx('users')
                .returning('*')  
                .insert({
                    email:loginEmail[0],
                    name:name,
                    joined:new Date()
                })
                .then(user=>{
                    res.json(user[0]);//knex returns table so we get only the value
                })
                
        })
        .then(trx.commit)
        .catch(trx.rollback)

    })
    .catch(err => res.status(400).json('unable to register'));
    


}

module.exports = {
    handleRegister: handleRegister
}