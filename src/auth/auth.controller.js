import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { emailOrUser, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [
                { email: emailOrUser },
                { userName: emailOrUser }
            ]
        });

        if (!user) {
            return res.status(400).json({
                msg: "Incorrect credentials, Email does not exist in the database"
            })
        }

        if (!user.state) {
            return res.status(400).json({
                msg: "User does not exist in te dataBase"
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect"
            })
        }

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: 'Login Ok :D',
            user,
            token
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con administrador :|"
        })
    }
}