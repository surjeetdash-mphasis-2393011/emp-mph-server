const express = require('express')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const router = express.Router()
const User = require('../models/UserModel')
const UserModel = mongoose.model('user')

router.get('/list', async (req, res) => {
  console.log('get request user')
  UserModel.find((error, doc) => {
    if (!error) {
      console.log('UserModel successfully...')
      console.log(doc)
      res.status(200).send(doc)
    } else {
      res.status(300).send('Error')
      console.log('Error in UserModel...')
    }
  })
})

router.post('/login', async (req, res) => {

  console.log('login called')
  console.log(req.body.user_email)
  console.log(req.body.user_password)
  if (!req.body.user_email || !req.body.user_password) {
    console.log('username or password missing')
    res.send('username or password missing')
    return
  }

  UserModel.findOne({ "user_email": req.body.user_email },
    function (err, doc) {
      if (err) {
        console.log(err);
        res.status(300).send('error')
        res.json(getStandardResponse("300", "error", "Internal error. Please try later!", ""))
      } else {
        console.log('Data : ' + doc)
        if (!doc) {
          console.log('user not registered');
          res.json(getStandardResponse("302", "success", "user not registered", ""))
        } else {
          console.log('Data : ' + doc.get("user_password"))
          if (doc.user_password != req.body.user_password) {
            res.json(getStandardResponse("303", "success", "wrong password", ""))
          } else {
            res.json(getStandardResponse("200", "success", "login success", ""))
          }
        }
      }
    })
})

router.post('/registration', async (req, res) => {

  console.log('registration called')
  if (!req.body.user_email || !req.body.user_password ||
    !req.body.user_firstname || !req.body.user_lastname) {
    console.log('Missing data in request')
    res.status(405).send('Missing data in request')
    return
  }

  var newUser = new UserModel(
    {
      "user_email": req.body.user_email,
      "user_password": req.body.user_password,
      "user_name": req.body.user_name,
      "user_phone": req.body.user_phone,
      "user_emp_id": req.body.user_emp_id,
      "user_vertical": req.body.user_vertical,
      "user_location": req.body.user_location,
      "user_bluetooth": req.body.user_bluetooth,
      "user_covid_status": 'false',
      "user_image": req.body.user_image

    })

  newUser.save(function (err, data) {
    if (err) {
      console.log(error);
      res.status(300).send('Error')
    }
    else {
      res.json(getStandardResponse("200", "success", "Registration successful", ""))
    }
  })
})


router.post('/forgotpassword', async (req, res) => {
  console.log('forgotpassword called')
  if (!req.body.user_email) {
    console.log('Missing data in request')
    res.status(405).send('Missing data in request')
    return
  }
  console.log("user_email:" + req.body.user_email)

  UserModel.findOneAndUpdate({ 'user_email': req.body.user_email },
    { "user_password": '000000' }, function (err, data) {
      if (err) {
        console.log(err);
        res.status(300).send(err)
      }
      else {
        console.log("password reset");
        res.status(311).send('password changed. Please use 000000')
      }
    })
})

router.post('/edituser', async (req, res) => {

  console.log('edituser called')
  if (!req.body.user_email || !req.body.user_password ||
    !req.body.user_name || !req.body.user_phone ||
    !req.body.user_emp_id || !req.body.user_vertical ||
    !req.body.user_location || !req.body.user_bluetooth ||
    !req.body.user_image) {
    console.log('Missing data in request')
    res.status(405).send('Missing data in request')
    return
  }

  UserModel.findOneAndUpdate({ "user_email": req.body.user_email },
    {
      "user_name": req.body.user_name,
      "user_phone": req.body.user_phone,
      "user_vertical": req.body.user_vertical,
      "employee_phone": req.body.employee_phone,
      "user_image": req.body.user_image
    }, function (err, data) {
      if (err) {
        console.log(err);
        res.status(300).send(err)
      }
      else {
        console.log("password reset");
        res.status(312).send('profile updated')
      }
    })
})

router.post('/updateStatus', async (req, res) => {

  console.log('updateStatus called')
  if (!req.body.user_email) {
    console.log('Missing data in request')
    res.status(405).send('Missing data in request')
    return
  }

  UserModel.findOneAndUpdate({ "user_email": req.body.user_email },
    {
      "user_covid_status": 'true',
    }, function (err, data) {
      if (err) {
        console.log(err);
        res.status(300).send(err)
      }
      else {
        console.log("updateStatus successful");
        res.json(getStandardResponse("200", "success", "updateStatus successful", ""))
      }
    })
})

function getStandardResponse(status, type, message, data) {
  return {
    "status": status,
    "type": type,
    "message": message,
    "data": data
  }
}
module.exports = router