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

            const validation = await schema.validate(dataRequest).catch((err) => {
                return err.errors[0];
            });

            if (!validation) {
                return res.status(400).json({ status: 'error', message: validation });
            }

            const { email, password } = req.body

            // Check if email and password is correct or not from database
            const userQueryRes = await excuteQuery({
                query: 'SELECT user.*, cabang_dealer.nama_cabang, posisi_user.nama_posisi FROM user JOIN cabang_dealer ON user.cabang_id = cabang_dealer.cabang_id JOIN posisi_user ON user.posisi_id = posisi_user.posisi_id WHERE email = ?',
                values: [email]
            });

            // check if userQueryRes has key error
            if ('error' in userQueryRes) {
                if (userQueryRes.sqlMessage) {
                    throw new Error(userQueryRes.error.sqlMessage);
                } else {
                    throw new Error(userQueryRes.error);
                }
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
            const exp = process.env.JWT_EXPIRES_IN;

            if (!secretString) {
                return res.status(500).json({ status: 'error', message: 'Internal server error'});
            }
            const secret = secretString.toString();
            const expiresIn = exp ? exp.toString() : '1h';


            // Update User Model
            const UserModel = {
                id: user.user_id,
                nama: user.nama_user,
                email: user.email,
                nomor: user.nomor,
                posisi: {
                    id: user.posisi_id,
                    nama: user.nama_posisi
                },
                cabang: {
                    id: user.cabang_id,
                    nama: user.nama_cabang
                },
                status_user: user.status_user,
                created_at: user.created_at,
                updated_at: user.updated_at
            }
    
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
            // console.log(error);
            return res.status(500).json({ status: 'error', message: error.message });
        } else {
            // console.log(error);
            return res.status(500).json({ status: 'error', message: 'An error occured' });
        }
    }
}
