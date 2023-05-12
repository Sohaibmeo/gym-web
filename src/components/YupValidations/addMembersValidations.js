import * as yup from 'yup';
export const validationSchema = yup.object({
    email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
    
    firstName: yup 
    .string("Emter Your First Name")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required"),
    
    address: yup 
    .string("Emter Your Address")
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Address is required"),
    
    admissionFee: yup
    .number('Enter your admission fee')
    .required('Fee is required')
    .min(1, "Cant be lower than this"),
    
    monthlyFee: yup
    .number('Enter your monthly fee')
    .required('Fee is required')
    .min(1, "Cant be lower than this"),
    
    lastName: yup
      .string("Enter Your Last Name")
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Lastname is required"),
      
    phoneNumber: yup
    .string("Enter Your Phone Number")
    .required("Phone number is required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number"
        ),
    cnic: yup
    .string()
    .length(13,"13 characters required")
    .matches(/^[0-9]{13}$/, 'Must be numbers')
    .required("Cnic is required"),
    
    gender: yup
    .string("Enter Your Gender(There are only 2)")
    .required("Please specify your gender"),
    dateOfBirth: yup
    .date(),
    // .required("Please Provide the DOB"),
    feeReceiving: yup
    .date(),
    totalPayment: yup
    .string()
    .matches(/^[0-9]*$/, 'Must be numbers'),
    height: yup
    .string()
    .matches(/^[0-9]*$/, 'Must be numbers'),
    weight: yup
    .string()
    .matches(/^[0-9]*$/, 'Must be numbers'),
    feeReceivingCheck: yup
    .bool(),
    profilePicture: yup
    .mixed(),
      }); 