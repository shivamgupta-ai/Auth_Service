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

const validateIsAdmin = (req, res, next) => {
    const userId = req.body?.userId || req.body?.id || req.query?.userId || req.query?.id;
    if(!userId){
        return res.status(400).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: 'User ID missing in the request'
        });
    }
    req.body = req.body || {};
    req.body.id = userId;
    req.body.userId = userId;
    next();
}

module.exports = {
    validateUserSignup,
    validateUserAuth,
    validateIsAdmin
}