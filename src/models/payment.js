import mongoose from 'mongoose';
1
const orderSchema = new mongoose.Schema({
    items: Array,
    totalAmount: Number,
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
      enum : ['canceled' , 'failed' , 'pending' , 'success' , 'shipping'],
      default : 'pending'
    }, // e.g., 'paid', 'pending'
  }, {timestamps : true});

  export default mongoose.model('Orders', orderSchema);
