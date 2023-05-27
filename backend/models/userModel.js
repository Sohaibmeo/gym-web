const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String,
      required: true ,},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    gender: { type: String, required: true },
    blood: { type: String, default: 'None' },
    admissionFee: { type: Number, required: true },
    monthlyFee: { type: Number, required: true },
    cnic: { type: Number, required: true},
    address: { type: String, required: true },
    height: { type: Number },
    weight: { type: Number },
    dateOfAdmission: { type: Date, default: Date.now },
    feeReceivingCheck: { type: Boolean, default: false },
    profilePicture: { type: String, default: null },
  });

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;