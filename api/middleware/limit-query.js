const limitQuery = () => (req, res, next) => {
    const {id: userId, role} = req.user;
    req.queryCondition = role === 'admin' ? {} : {userId};
    next();
};

module.exports = limitQuery;
