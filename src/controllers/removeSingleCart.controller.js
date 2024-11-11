import Cart from '../models/CardModel.js'
export const removeSingleCart = async (req , res , next) => {
    try {
        const { cartId } = req.params;
        console.log(cartId)
        const cart = await Cart.findByIdAndDelete(cartId);
        if (!cart) {
            return res.status(404).json({
                success : false,
                message : "Cart not found !"
            })
        }
        res.status(200).json({
            success : true,
            message : "Cart deleted successfully !"
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message || "Some thing went wrong !"
        })
    }
}