const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(' ')[1]

        var decoded = jwt.verify(token, process.env.JWT_KEY);
        req._decoded=decoded
        next()
      } catch(err) {
          return res.status(401).json({
              error: err,
              message: 'Token không hợp lệ'
          })
      }
}