module.exports = {
    gethome: (req, res)=>{
        res.render('index')
    },

    getlogin: (req, res)=>{
        res.render('login')
    },
    getSignup: (req, res)=>{
        res.render('signup')
    }
}