import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import Data from '../../../types/Data';
import * as yup from 'yup';
import excuteQuery from '../../../lib/db';
import bcrypt from 'bcrypt';
import User from '../../../models/User';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        if (req.method === 'POST') {
            // Validate request body
            const dataRequest = {
                email: req.body.email,
                password: req.body.password
            }

            await schema.validate(dataRequest);

            const { email, password } = req.body

            // Check if email and password is correct or not from database
            const userQueryRes = await excuteQuery({
                query: 'SELECT * FROM user WHERE email = ?',
                values: [email]
            });

            // check if userQueryRes has key error
            if ('error' in userQueryRes) {
                throw new Error(userQueryRes.error.sqlMessage);
            } else if (userQueryRes.length === 0) {
                return res.status(401).json({ status: 'error', message: 'Email or password is incorrect'});
            }

            const user = userQueryRes[0];
            const hashedPassword = user.password;

            // Check if password is correct or not (hashed)
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    throw new Error('An error occured');
                }
                const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

                if (!isPasswordMatch) {
                    return res.status(401).json({ status: 'error', message: 'Email or password is incorrect'});
                }
            });

            // Set Secret key
            const secretString = process.env.JWT_SECRET;
            const exp = process.env.JWT_EXPIRES_IN || '1h';
    
            if (!secretString) {
                return res.status(500).json({ status: 'error', message: 'Internal server error'});
            }
            const secret = secretString.toString();
            const expiresIn = exp.toString();

            // Update User Model
            const UserModel = new User(user.user_id, user.name, user.email, user.nomor, user.posisi_id, user.cabang_id, user.status_user, user.created_at, user.updated_at);
    
            const token = jwt.sign({ user:UserModel }, secret, { expiresIn: expiresIn });
            
            return res.status(200).json({ status: 'success', message: 'Login success', data: {
                token: token,
                user: UserModel
            } });
        } else {
            return res.status(405).json({ status: 'error', message: 'Method not allowed' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ status: 'error', message: error.message });
        } else {
            return res.status(500).json({ status: 'error', message: 'An error occured' });
        }
    }
}
