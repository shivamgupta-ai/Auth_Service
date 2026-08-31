const validateUserSignup = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: 'Email or password missing in the signup request'
        });
    }
    next();
}

const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: 'Email or password missing in the signin request'
        });
    }
    next();
}

module.exports = {
    validateUserSignup,
    validateUserAuth
}