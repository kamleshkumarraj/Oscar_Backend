import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }, // OTP expires in 5 minutes
    },
});

export default mongoose.model('Otp', otpSchema);
