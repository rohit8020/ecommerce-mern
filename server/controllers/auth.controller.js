import AuthService from "../services/auth.service.js";
import User from "../models/User.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config()

class AuthController {
    static async signUpHandler(req, res) {
        try {
            const { username, password } = req.body;

            // Check if the user already exists
            const existingUser = await AuthService.findUser({username});
            if (existingUser) {
                return res.status(409).json({success:false, error: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const user = new User({
                username,
                password: hashedPassword,
            });

            await user.save();

            res.status(201).json({success:true, message: 'User created successfully' });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    static async loginHandler(req, res) {
        try {
            const { username, password } = req.body;

            // Find the user
            const user = await AuthService.findUser({ username });
            if (!user) {
                return res.status(401).json({success:false, error: 'Invalid username or password' });
            }

            // Check the password
            const validPassword = bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            
            // Generate a JWT token
            const token = jwt.sign({_id:user._id,username:user.username}, process.env.SECRET);

            res.json({ success:true, token: token });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

export default AuthController;