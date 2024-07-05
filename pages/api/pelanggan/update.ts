import { NextApiRequest, NextApiResponse } from 'next'
import Data from '../../../types/Data';
import * as yup from 'yup';
import authenticate from '../../../middlware/authenticate';
import Pelanggan from '../../../models/Pelanggan';

const schema = yup.object().shape({
    id: yup.number().required(),
    nama: yup.string().required(),
    no_wa: yup.string().required(),
    email: yup.string().email().required(),
    tgl_lahir: yup.string().required(),
    agama: yup.string().required(),
    id_pekerjaan: yup.number().nullable(),
    jenis_kelamin: yup.string().nullable(),
    id_kelurahan: yup.number().nullable(),
    id_kecamatan: yup.number().nullable(),
    id_kabupaten: yup.number().nullable(),
    kelurahan: yup.string().nullable(),
    kecamatan: yup.string().nullable(),
    kabupaten: yup.string().nullable(),
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
                    no_wa: req.body.no_wa,
                    email: req.body.email,
                    tgl_lahir: req.body.tgl_lahir,
                    agama: req.body.agama,
                    id_pekerjaan: req.body.id_pekerjaan,
                    jenis_kelamin: req.body.jenis_kelamin,
                    id_kelurahan: req.body.id_kelurahan,
                    id_kecamatan: req.body.id_kecamatan,
                    id_kabupaten: req.body.id_kabupaten,
                    kelurahan: req.body.kelurahan,
                    kecamatan: req.body.kecamatan,
                    kabupaten: req.body.kabupaten,
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
    
                const { id, nama, no_wa, email, tgl_lahir, agama, id_pekerjaan, jenis_kelamin, id_kelurahan, id_kecamatan, id_kabupaten, kelurahan, kecamatan, kabupaten } = req.body;

                await Pelanggan.update(
                    id,
                    nama,
                    no_wa,
                    email,
                    tgl_lahir,
                    agama,
                    id_pekerjaan,
                    jenis_kelamin,
                    id_kelurahan,
                    id_kecamatan,
                    id_kabupaten,
                    kelurahan,
                    kecamatan,
                    kabupaten,
                    null,
                    null
                ).then((result) => {
                    if (result.error) {
                        return res.status(400).json({ status: 'error', message: result.error });
                    } else {
                        return res.status(200).json({ status: 'success', message: 'Pelanggan updated successfully' });
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