module.exports.success = async(res, obj) => {
    res.status(200).send({
        success: true,
        result: obj
    });
};

module.exports.fail = async(res, msg) => {
    res.status(200).send({
        success: false,
        message: msg
    });
};