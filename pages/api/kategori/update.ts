import { NextApiRequest, NextApiResponse } from 'next'
import Data from '../../../types/Data';
import * as yup from 'yup';
import authenticate from '../../../middlware/authenticate';
import Kategori from '../../../models/Kategori';

const schema = yup.object().shape({
    id: yup.number().required(),
    nama: yup.string().required(),
    status: yup.string().required()
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
                    status: req.body.status
                }
    
                const validation = await schema.validate(dataRequest)
                .then(() => {
                    return null;
                })
                .catch((err) => {
                    return err.errors[0];
                })

                if (validation != null) {
                    return res.status(400).json({ status: 'error', message: validation });
                }
    
                const { id, nama, status } = req.body;

                await Kategori.update(
                    id,
                    nama,
                    status,
                    null,
                    null,
                ).then((result) => {
                    if (result.error) {
                        return res.status(400).json({ status: 'error', message: result.error });
                    } else {
                        return res.status(200).json({ status: 'success', message: 'Kategori updated successfully' });
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