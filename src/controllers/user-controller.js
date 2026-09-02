const UserService = require('../services/user-service');

const userService = new UserService();


const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            message: "Successfully created a User",
            data: response,
            success: true,
            err: {}
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error.message
        });
    }
}

const destroy = async (req, res) => {
    try {
        const response = await userService.delete(req.params.id);
        return res.status(200).json({
            message: "Successfully deleted a user",
            data: response,
            success: true,
            err: {}
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error.message
        });
    }
}

const signIn = async(req, res) => {
    try{
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            message: "Successfully logged in",
            data: response,
            success: true,
            err: {}
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error.message
        });
    }
}

const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            message: 'User is authenticated and token is valid',
            data: response,
            success: true,
            err: {}
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error.message
        });
    }
}

module.exports = {
    create,
    destroy,
    signIn,
    isAuthenticated
}