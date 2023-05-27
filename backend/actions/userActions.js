const UserModel = require("../models/userModel");

 const getAllUsers= () =>  {
    UserModel.find()
    .then(users => {
      console.log('All users:', users);
    })
    .catch(error => {
      console.error('Error retrieving users:', error);
    });
}
 const addUser = async({
    email,
    firstName,
    lastName,
    phoneNumber,
    gender,blood,
    admissionFee,
    monthlyFee,
    cnic,
    address,
    height,
    weight,
    dateOfAdmission,
    feeReceivingCheck,
},{profilePicture}) => {
  console.log("Blob Data : ",profilePicture)
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
        height: height ,
        weight: weight,
        dateOfAdmission: dateOfAdmission,
        feeReceivingCheck: feeReceivingCheck,
        profilePicture: profilePicture,
      });
      
      return await newUser.save()
        .then(savedUser => {
          console.log(`New user created: ${savedUser.firstName} ${savedUser.lastName} Email : ${savedUser.email}`);
          return savedUser
        })
        .catch(error => {
          console.error('Error creating user:', error.code);
          return {error: error.code}
        });
}
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

const InitiateDummyDataUser= () =>  {
    const newUser = new UserModel({
        email: 'foobar@gmail.com',
        firstName: 'Sohaib',
        lastName: 'Meo',
        phoneNumber: '00923044482556',
        gender: 'M',
        blood: 'None',
        admissionFee: 5000,
        monthlyFee: 4000,
        cnic: 4220127714315,
        address: '410 A1 Johar Town, Lahore',
        height: 175,
        weight: 100,
        dateOfAdmission: new Date(),
        feeReceivingCheck: false,
        profilePicture: '',
      });
      
      newUser.save()
        .then(savedUser => {
          console.log('New user created:', savedUser);
        })
        .catch(error => {
          console.error('Error creating user:', error);
        });
      
}

module.exports = {
  InitiateDummyDataUser,
  addUser,
  getAllUsers,
  findUserById,
  findAndUpdate,
  deleteUserById,
}