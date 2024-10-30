import Order from '../models/payment.js'
export const getAllOrdersByStatus = async (req , res , next) => {
    try{
        const orders = await Order.find({status : req.params.status})

        if(!orders){
           res.status(404).json({
            success : false,
            message : "No orders found with the given status !"
           })
        }
        res.status(200).json({
            success : true,
            message : "you get all orders successfully.",
            data : orders
        })
    }catch(err){
        res.status(401).json({
            success : false,
            message : "Get Error during finding all orders from database !"
        })
    }
}