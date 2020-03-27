const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: 'Unable to find the requested resource!',
    });
    next();
};

module.exports = notFoundHandler;
