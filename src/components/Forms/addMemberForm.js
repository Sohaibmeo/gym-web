import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Checkbox, Grid, MenuItem } from '@material-ui/core';
import { DatePicker } from '@mui/x-date-pickers';
import styles from './addMemberForm.module.scss'
import {validationSchema} from '../YupValidations/addMembersValidations'
import Webcam from 'react-webcam';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const videoConstraints = {
  facingMode: 'user',
};
    export const MyForm = () => {

      const [picture, setPicture] = useState('');
      const webcamRef = React.useRef(null);
      const retake = () => {
        setPicture('');
      };
      const formik = useFormik({
        initialValues: {
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
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      try {
        const response = await fetch('http://localhost:8000/api/users/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('User added:', data);
          // Handle successful response as needed
        } else {
          const errorResponse = await response.json();
          console.error('Error adding user:', errorResponse.error);
        }
      } catch (error) {
        console.log(error)
        console.error('Error adding user:', error);
        // Handle error response as needed
      }
    },
  });
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    formik.setFieldValue('profilePicture', pictureSrc);
  }, [formik]);
  
  return (  
    <div>
      <form onSubmit={formik.handleSubmit} >
        <Grid container className={styles.outerGrid}>
          <Grid item xs={7} className={styles.innerLeftGrid} >
          <Grid container className={styles.gridContainer}>
          <Grid item xs={5} className={styles.textfieldGrid}>
            <TextField
            className={styles.textfield}
            variant="outlined"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <TextField
            variant="outlined"
            className={styles.textfield}
            id="cnic"
            name="cnic"
            label="CNIC"
            value={formik.values.cnic}
            onChange={formik.handleChange}
            error={formik.touched.cnic && Boolean(formik.errors.cnic)}
            helperText={formik.touched.cnic && formik.errors.cnic}
          />
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
            <TextField
            variant="outlined"
            className={styles.textfield}
            id="height"
            name="height"
            label="Height"
            value={formik.values.height}
            onChange={formik.handleChange}
            error={formik.touched.height && Boolean(formik.errors.height)}
            helperText={formik.touched.height && formik.errors.height}
          />
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
            <TextField
            variant="outlined"
            className={styles.textfield}
            id="weight"
            name="weight"
            label="Weight"
            value={formik.values.weight}
            onChange={formik.handleChange}
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
          />
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <TextField
            variant="outlined"
            className={styles.textfield}
            id="firstname"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          </Grid>
          
          <Grid item xs={5} className={styles.textfieldGrid}>
          <TextField
            variant="outlined"
            className={styles.textfield}
            id="lastname"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <TextField
            variant="outlined"
            className={styles.textfield}
            id="address"
            name="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <TextField
            variant="outlined"
            className={styles.textfield}
            id="phonenumber"
            name="phoneNumber"
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <TextField
            variant="outlined"
            className={styles.textfield}
            id="admissionfee"
            name="admissionFee"
            label="Admission Fee"
            value={formik.values.admissionFee}
            onChange={formik.handleChange}
            error={formik.touched.admissionFee && Boolean(formik.errors.admissionFee)}
            helperText={formik.touched.admissionFee && formik.errors.admissionFee}
          />
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <TextField
            variant="outlined"
            className={styles.textfield}
            id="monthlyfee"
            name="monthlyFee"
            label="Monthly Fee"
            value={formik.values.monthlyFee}
            onChange={formik.handleChange}
            error={formik.touched.monthlyFee && Boolean(formik.errors.monthlyFee)}
            helperText={formik.touched.monthlyFee && formik.errors.monthlyFee}
          />
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <TextField
            variant="outlined"
            className={styles.textfield}
            select
            id="gender"
            name="gender"
            label="Select Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
            <MenuItem value="O">Other</MenuItem>
          </TextField>
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <TextField
            select
            variant="outlined"
            className={styles.textfield}
            id="blood"
            name="blood"
            label="Blood Group"
            value={formik.values.blood}
            onChange={formik.handleChange}
            error={formik.touched.blood && Boolean(formik.errors.blood)}
            helperText={formik.touched.blood && formik.errors.blood}
          >
            <MenuItem value="O+"> O Positive </MenuItem>
            <MenuItem value="O-"> O Negative </MenuItem>
            <MenuItem value="A+"> A Postive </MenuItem>
            <MenuItem value="A-"> A Negative </MenuItem>
            <MenuItem value="B+"> B Positive </MenuItem>
            <MenuItem value="B-"> B Negative </MenuItem>
            <MenuItem value="AB-"> AB Positive </MenuItem>
            <MenuItem value="AB-"> AB Negative </MenuItem>
            <MenuItem value="None"> I Dont Know </MenuItem>
          </TextField>
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <DatePicker
            id="dateOfBirth"
            className={styles.textfield}
            name="dateOfBirth"
            label="Date Of Birth"
            onChange={(event) => {
              formik.setFieldValue('dateOfBirth', event.toDateString());
            }}
            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <DatePicker
            id="dateOfAdmission"
            className={styles.textfield}
            name="dateOfAdmission"
            label="Date Of Admission"
            onChange={(event) => 
            {
              formik.setFieldValue("dateOfAdmission", event.toDateString())
            }}
            error={formik.touched.dateOfAdmission && Boolean(formik.errors.dateOfAdmission)}
            helperText={formik.touched.dateOfAdmission && formik.errors.dateOfAdmission}
          />
          </Grid>
          <Grid item xs={12} className={styles.textfieldGrid}>
          <Checkbox
            id='feeReceivingCheck'
            name='feeReceivingCheck'
            checked={formik.values.feeReceivingCheck}
            onChange={formik.handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Fee Receiving?
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <DatePicker
            id="feeReceiving"
            className={styles.textfield}
            name="feeReceiving"
            label="Date Of Fee Receiving"
            onChange={(event) => 
            {
              formik.setFieldValue("feeReceiving", event.toDateString())
            }}
            error={formik.touched.feeReceiving && Boolean(formik.errors.feeReceiving)}
            helperText={formik.touched.feeReceiving && formik.errors.feeReceiving}
          />
          </Grid>
          <Grid item xs={5} className={styles.textfieldGrid}>
          <TextField
            className={styles.textfield}
            id="totalPayment"
            variant="outlined"
            name="totalPayment"
            label="Total Payment"
            value={formik.values.totalPayment}
            onChange={formik.handleChange}
            error={formik.touched.totalPayment && Boolean(formik.errors.totalPayment)}
            helperText={formik.touched.totalPayment && formik.errors.totalPayment}
          />
          </Grid>
          </Grid>
          </Grid>
          <Grid item xs={4} className={styles.innerRightGrid} >
            <Grid item >
              <Card>
                {picture === '' ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className={styles.webcam}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    image={picture}
                    title="Captured image"
                    className={styles.capturedWebcam}
                  />
                )}
              </Card>
            </Grid>
            <Grid item  >
              {picture === '' ? (
              <IconButton onClick={capture}>
              <CameraAltIcon fontSize="large" />
              </IconButton>
              ) : (
              <IconButton onClick={retake}>
              <CameraAltIcon fontSizg1e="large" color="secondary" />
              </IconButton>
              )}
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
