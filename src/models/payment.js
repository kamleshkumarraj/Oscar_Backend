import mongoose from 'mongoose';
1
const orderSchema = new mongoose.Schema({
    items: Array,
    totalAmount: Number,
    title : String,
    user : {
      type : mongoose.Schema.ObjectId,
      ref : 'Oscar-printing-users',
      required : true
    },
    customer: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    paymentIntentId: String,
    status: {
      type : String,
      enum : ["Pending", "Confirmed" , "Shipped", "Out For Delivery" , "Delivered" , 'Cancelled' ],
      default : 'pending'
    }, // e.g., 'paid', 'pending'
  }, {timestamps : true});

  export default mongoose.model('Orders', orderSchema);
