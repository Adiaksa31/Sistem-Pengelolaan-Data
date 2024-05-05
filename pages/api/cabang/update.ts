import { NextApiRequest, NextApiResponse } from 'next'
import Data from '../../../types/Data';
import * as yup from 'yup';
import authenticate from '../../../middlware/authenticate';
import Cabang from '../../../models/Cabang';

const schema = yup.object().shape({
    id: yup.number().required(),
    nama_cabang: yup.string().required(),
    alamat_cabang: yup.string().nullable(),
    nomor: yup.string().nullable(),
    status_cabang: yup.string().nullable()
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
                    nama_cabang: req.body.nama_cabang,
                    alamat_cabang: req.body.alamat_cabang,
                    nomor: req.body.nomor,
                    status_cabang: req.body.status_cabang,
                }
    
                const validation = await schema.validate(dataRequest).catch((err) => {
                    return err.errors[0];
                });

                if (!validation) {
                    return res.status(400).json({ status: 'error', message: validation });
                }
    
                const { id, nama_cabang, alamat_cabang, nomor, status_cabang } = req.body;

                await Cabang.update(
                    id,
                    nama_cabang,
                    alamat_cabang,
                    nomor,
                    status_cabang,
                    null,
                    null,
                ).then((result) => {
                    if (result.error) {
                        return res.status(400).json({ status: 'error', message: result.error });
                    } else {
                        return res.status(200).json({ status: 'success', message: 'Cabang updated successfully' });
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