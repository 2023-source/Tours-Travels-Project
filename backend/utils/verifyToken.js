import jwt from "jsonwebtoken"
const verifyToken = (req,res,next)=>
{
    // console.log(req.cookies.accessToken)
    const token = req.cookies.accessToken
    if (!token)
    {
        return res.status(401).json({success:false,message:'You are not authorize'})
    }

    // if token exist verify token 
    jwt.verify(token, process.env.JWT_SECRET_KEY,(err,user)=>
    {
        if (err)
        {
            return res.status(401).json({success:false, message:'Token is invalid'})
        }

        req.user = user
        next() 
    })

}

export const verifyUser = (req,res,next)=>
{
    verifyToken(req,res,next,()=>
    {
        if (req.user.role === "admin" || req.user.id === req.params.id)
        {
            next();
        }
        else
        {
            return res.status(401).json({success:false,message:'You are not authenticated'})
        }
    })
};

export const verifyAdmin = (req,res,next)=>
{
    verifyToken(req,res,next,()=>
    {
        if (req.user.role === "admin")
        {
            next();
        }
        else
        {
           return res.status(401).json({success:false,message:'You are not authorize'})
        }
    })
};