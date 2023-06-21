import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
class AuthMiddleware {
    static async isLoggedIn(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, error: "Authorization header invalid format!" })
            }
            const user = jwt.verify(token, process.env.SECRET)
            if (!user) {
                return res.status(401).json({ success: false, error: "Invalid Access Token!" })
            }
            req.user = user
            next()
        } catch (err) {
            res.status(401).json({ success: false, error: err.message })
        }
    }
}

export default AuthMiddleware