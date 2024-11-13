import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import jwt from 'jsonwebtoken';
import config from "../config/config.js";

export const protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.cookie) {
        token = req.headers.cookie.slice(4);
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access', 401)
        );
    }
    // verification token
    const decoded = jwt.verify(token, config.jwt.secret);

    // check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exits.',
                401
            ));
    }
    // check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //     return next(new AppError('User recently changed password! Please log in again.', 401));
    // }

    req.user = currentUser;
    next();
})

const signToken = id => {
    return jwt.sign({ id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + config.jwt.cookieExpiresIn * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    // cookie only send on secure connection (https)
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('access_token', token, cookieOptions);

    // remove password from output
    user.password = undefined;
    user.passwordChangedAt = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

export const signup = catchAsync(
    async (req, res) => {
        const filter = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }

        const newUser = await User.create(filter);

        createSendToken(newUser, 201, res);
    }
);

export const login = catchAsync(
    async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            next(new AppError('Please provide email and password!', 400));
        }

        const user = await User.scope('withPassword').findOne({ where: { email: email } });

        if (!user || !user.validPassword(password)) {
            next(new AppError('Incorrect email or password', 401));
        }

        createSendToken(user, 200, res);
    }
)