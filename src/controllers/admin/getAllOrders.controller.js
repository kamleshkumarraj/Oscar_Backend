import Orders from '../../models/payment.js'
import Users from '../../models/userModel.js'
export const getAllOrders = async (req , res , next) => {
    try {
        const orders = await Orders.find();
        res.status(200).json({
            success : true,
            message : "All orders fetched successfully",
            data : orders
        })
    } catch (error) {
        res.status(403).json({
            success : false,
            message : error.message ||'Something went wrong !',
            
        })
    }
}

export const getAllUsers = async (req , res , next) => {
    try {
        const users = await Users.find();
        res.status(200).json({
            success : true,
            message : "All users fetched successfully",
            data : users
        })
        
    } catch (error) {
        res.status(403).json({
            success : false,
            message : error.message ||'Something went wrong !'
        })
    }
}