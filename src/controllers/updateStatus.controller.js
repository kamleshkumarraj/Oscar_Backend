import Orders from '../models/payment.js'
export const updateStatus = async (req , res , next ) => {
    try {
        const {id} = req.params;
        const status = req.body.status;
        const orders = await Orders.findById(id);
        console.log(id , status)
        if(!orders) {
            res.status(400).json({
                success : false,
                message : "Orders not found for given id !"
            })
        }
        orders.status = status;
        await orders.save();
        
        res.status(200).json({
            success : true,
            message : "Status updated successfully !",
            data : orders
        })

    } catch (error) {
        console.log(error.stack)
        res.status(400).json({
            success : false,
            message : "We get an error while updating status !"
        })
    }
}