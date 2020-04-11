const limitQuery = field => (req, res, next) => {
    const {id, role} = req.user;
    req.queryCondition = role === 'admin' ? {} : {[field]: id};
    next();
};

module.exports = limitQuery;
