import mongoose from 'mongoose';
1
const orderSchema = new mongoose.Schema({
    items: Array,
    totalAmount: Number,
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
  });

  export default mongoose.model('Orders', orderSchema);
