const protect = async (req, res, next) => {
    req.user = {
        id: 1
    };
    
    next();
}

export default protect;