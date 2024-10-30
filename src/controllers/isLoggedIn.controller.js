
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req , res , next) =>{
    let {token} = req.cookies;
    token ? token : req.query.token;
    if(!token){
        res.status(400).json({
            success : false,
            message : "Please provide token"
        })
    }
     try{
        const decodedData = jwt.verify(token , "oscar_printing_v1")
        req.user = await userModels.findById(decodedData.id);
        next();
     }
     catch(err){
        next(new ErrorHandler(err.stack , 404))
     }

    
    }

export default isLoggedIn