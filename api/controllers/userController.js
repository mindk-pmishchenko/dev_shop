const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const baseController = require('./baseController');
const User = require('../models/user.model');
const Pure = require('../models/pure.model');
const helper = require('./../utils/helper');

class UserController extends baseController {
    static getAllUsers = catchAsync(async (req, res, next) => {
        //console.log(req.user);
        const data = await new User(req).getAllUsers();
        helper.sendResponse(data, res);
    });

    static editPersonalInfo = catchAsync(async (req, res, next) => {
        //filtering body from trash [just allowed fields]
        const allowedFields = ['last_name', 'first_name'];
        const filteredBody = {};
        //object with allowed fields generation
        Object.keys(req.body).forEach(el => {
            if (allowedFields.includes(el)) filteredBody[el] = req.body[el];
        });
        const updatedUser = await new User(req).findAndUpdate(filteredBody);
        helper.sendResponse(updatedUser, res);
    });

    static getUserData = catchAsync(async (req, res, next) => {
        const userData = await new User(req).getUserData();
        helper.sendResponse(userData[0], res);
    });
}

module.exports = UserController;
