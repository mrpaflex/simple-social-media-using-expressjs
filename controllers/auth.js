const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');


module.exports = {

signup:  async (req, res, next)=>{


const {email, username, password, confirmPassword} = req.body;

    let errors = [];

    if(!email || !username || !password || !confirmPassword){
        errors.push({error: 'all field are required'})
        next()
    }

    if(password !== confirmPassword){
        errors.push({error: 'password must matched'})
        next()  
    }

    if(password.length < 5){
        errors.push({error:'password must be greater than character'})
        next()
    } 

    if(errors.length > 0){
        res.render('signup')
        next()
        console.log(errors)   
    }else{
                const userexist = await User.findOne({email: email}).lean()

                if (userexist) {
                    res.render('signup')
                    errors.push({error: 'user with same credential already exit'})
                    next()
                    console.log(errors)
                } else{

                    const newuser = await new User({
                        username,
                        email,
                        password
                    })

                    //before saving the user hash the password

                    const salt = bcrypt.genSaltSync(12);
                    const hash = bcrypt.hashSync(newuser.password, salt)
                    newuser.password = hash;
                   newuser.save()
                    res.redirect('/login')
                    
                }
        }
    },
    
    loginNow: async (req, res, next)=>{

        
        passport.authenticate('local', (err, user, info)=>{
           if(err) {
            return next(err)
           }

           if(!user){
            return res.redirect('/login');
           }
           req.login(user, (err)=>{
            if (err) {
                return next(err)
            }   
            return res.redirect('/dashboard')
           })
        })(req, res, next);
    },

  

    logout: (req, res) => {
        req.logout(()=>{
            res.redirect('/'); 
        }); 

    }

}