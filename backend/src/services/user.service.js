const bcrypt = require('bcryptjs')

class UserService {
    async registerUser(username, email, pass){
        const salt = await bcrypt.genSalt(12);
        await bcrypt.hash(pass, salt);
        
        const hashedpass = await bcrypt.hash(pass, salt);
        
        await userModel.create({
            username,
            email,
            password: hashedpass,
        });
    }

}
const userService = new UserService();

module.exports = userService;