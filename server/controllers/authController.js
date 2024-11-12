export const protect = async (req, res, next) => {
    req.user = {
        id: 1
    };
    
    next();
}

export const signup = async (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: {
                id: 1
            }
        }
    });
}

export const login = async (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: {
                id: 1
            }
        }
    });
}