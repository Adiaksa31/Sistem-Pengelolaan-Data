import { NextApiRequest, NextApiResponse } from 'next'
import Data from '../../../types/Data';
import * as yup from 'yup';
import authenticate from '../../../middlware/authenticate';
import User from '../../../models/User';

const schema = yup.object().shape({
    nama: yup.string().required(),
    nomor: yup.number().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
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
                    nama: req.body.nama,
                    nomor: req.body.nomor,
                    email: req.body.email,
                    password: req.body.password,
                    posisi_id: req.body.posisi_id,
                    cabang_id: req.body.cabang_id
                }
    
                const validation = await schema.validate(dataRequest).catch((err) => {
                    return err.errors[0];
                });

                if (validation) {
                    return res.status(400).json({ status: 'error', message: validation });
                }
    
                const { nama, nomor, email, password, posisi_id, cabang_id } = req.body;
    
                const user = await User.findByEmail(email);

                if (user) {
                    return res.status(400).json({ status: 'error', message: 'Email already exist' });
                }

                await User.create(
                    nama,
                    email,
                    nomor,
                    password,
                    posisi_id,
                    cabang_id,
                    null,
                    null,
                    null,
                ).then((result) => {
                    if (result.error) {
                        return res.status(400).json({ status: 'error', message: result.error });
                    } else {
                        return res.status(200).json({ status: 'success', message: 'User created successfully' });
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