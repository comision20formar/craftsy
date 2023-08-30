module.exports = (req,res) => {
    req.session.destroy();
    res.cookie('craftsyForEver20',null,{
        maxAge : -1
    })
    return res.redirect('/')
}