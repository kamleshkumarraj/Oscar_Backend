import Orders from '../models/payment.js'
export const updateStatus = async (req , res , next ) => {
    try {
        const {id} = req.params;
        const status = req.body.status;
        const orders = await Orders.findById(id);
        if(!orders) {
            res.status(400).json({
                success : false,
                message : "Orders not found for given id !"
            })
        }
        const newOrders = await Orders.findByIdAndUpdate({id} , {status} , {
            new : true,
            runValidators : true
        })
        res.status(200).json({
            success : true,
            message : "Status updated successfully !",
            data : newOrders
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : "We get an error while updating status !"
        })
    }
}