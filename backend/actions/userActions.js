const UserModel = require("../models/userModel");
const returnDescriptor = require("../face_recognition")

 const getAllUsers= async() =>  {
    return await UserModel.find()
}

const addUser = async ({
  email,
  firstName,
  lastName,
  phoneNumber,
  gender,
  blood,
  admissionFee,
  monthlyFee,
  cnic,
  address,
  height,
  weight,
  dateOfAdmission,
  feeReceivingCheck,
}, { profilePicturePath }) => {
  const descriptor = await returnDescriptor(profilePicturePath,firstName,lastName);
  const newUser = new UserModel({
    email: email,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    gender: gender,
    blood: blood,
    admissionFee: admissionFee,
    monthlyFee: monthlyFee,
    cnic: cnic,
    address: address,
    height: height,
    weight: weight,
    dateOfAdmission: dateOfAdmission,
    feeReceivingCheck: feeReceivingCheck,
    profilePicture: profilePicturePath,
    descriptor: descriptor?.length > 0 ? descriptor : null,
  });

  try {
    const savedUser = await newUser.save();
    console.log(`New user created: ${savedUser.firstName} ${savedUser.lastName} Email : ${savedUser.email}`);
    return savedUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: error.message };
  }
};

 const findUserById= (userId) =>  {
    UserModel.findById(userId)
  .then(user => {
    if (user) {
      console.log('User found:', user);
    } else {
      console.log('User not found');
    }
  })
  .catch(error => {
    console.error('Error retrieving user:', error);
  });
}

 const findAndUpdate= (userId) =>  {
    UserModel.findByIdAndUpdate(userId, { firstName: 'Updated Name' }, { new: true })
    .then(updatedUser => {
      console.log('User updated:', updatedUser);
    })
    .catch(error => {
      console.error('Error updating user:', error);
    });
}

 const deleteUserById= (userId) =>  {
    UserModel.findByIdAndDelete(userId)
    .then(deletedUser => {
      console.log('User deleted:', deletedUser);
    })
    .catch(error => {
      console.error('Error deleting user:', error);
    });
}

module.exports = {
  addUser,
  getAllUsers,
  findUserById,
  findAndUpdate,
  deleteUserById,
}