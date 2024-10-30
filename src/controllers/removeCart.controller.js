import Card from "../models/CardModel.js";

export const removeCartUser = async (req , res , next) => {
    try{
        const {userId} = req.params;
        await Card.deleteMany({userId : userId});

    res.status(200).json({
        message : "Cart removed successfully",
        success : true
    })
    }catch(err){
        res.status(200).json({
            message : "Cart removed failed",
            success : false
        })
    }
}