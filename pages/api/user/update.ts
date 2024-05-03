import { NextApiRequest, NextApiResponse } from 'next'
import Data from '../../../types/Data';
import * as yup from 'yup';
import authenticate from '../../../middlware/authenticate';
import User from '../../../models/User';

const schema = yup.object().shape({
    id: yup.number().required(),
    nama: yup.string().required(),
    nomor: yup.number().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    status: yup.string().required(),
    posisi_id: yup.number().required(),
    cabang_id: yup.number().required()
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        if (req.method === 'POST') {
            authenticate(req, res, async () => {
                
                // Validate request body
                const dataRequest = {
                    id: req.body.id,
                    nama: req.body.nama,
                    nomor: req.body.nomor,
                    email: req.body.email,
                    password: req.body.password,
                    status: req.body.status,
                    posisi_id: req.body.posisi_id,
                    cabang_id: req.body.cabang_id
                }
    
                await schema.validate(dataRequest).catch((err) => {
                    return res.status(400).json({ status: 'error', message: err.errors[0] });
                });
    
                const { id, nama, nomor, email, password, status, posisi_id, cabang_id } = req.body;
    
                const user = await User.findByEmail(email);

                if (user) {
                    // Check jika bukan dirinya sendiri
                    if (user.id != id) {
                        return res.status(400).json({ status: 'error', message: 'Email already exist' , data: user});
                    }
                }

                await User.update(
                    id,
                    nama,
                    email,
                    nomor,
                    password,
                    posisi_id,
                    cabang_id,
                    status,
                    null,
                    null,
                ).then((result) => {
                    if (result.error) {
                        return res.status(400).json({ status: 'error', message: result.error });
                    } else {
                        return res.status(200).json({ status: 'success', message: 'User updated successfully' });
                    }
                }).catch((err) => {
                    return res.status(500).json({ status: 'error', message: err.message });
                });
            });
        } else {
            return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ status: 'error', message: error.message });
        } else {
            return res.status(500).json({ status: 'error', message: 'An error occured' });
        }
    }
}