module.exports = {
    gotoDashboard: (req, res)=>{
        res.render('dashboard', {user: req.user})
    },

}