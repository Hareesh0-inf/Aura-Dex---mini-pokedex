const userService = require("../services/user.service")

exports.handleUserReg = async (req, res) => {
    const body = (req.body);
    try {
        const {username, email, password} = body;
        const serviceResponse = await userService.registerUser(username, email, password);
        res.status(200).send(serviceResponse);
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
        });
    };
};