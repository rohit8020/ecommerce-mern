import User from '../models/User.js'

class AuthService{
    static async findUser(filter){
        const user = await User.findOne(filter);
        return user;
    }
}

export default AuthService;