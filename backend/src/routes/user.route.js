const express = require('express');
const { handleUserReg } = require('../controller/user.controller');
const userRouter  = express.Router();

userRouter.post('/add',handleUserReg);
// userRouter.patch('/update',);
// userRouter.get('/list',);
// userRouter.post('/auth',);

module.exports = {userRouter};