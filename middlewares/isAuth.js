module.exports = (req, res, next)=>{
    if(req.session.login) {
        next()
    }
    else {
        res.redirect('/trainer/login')
    }
}