import { NextApiRequest, NextApiResponse } from 'next'
import Data from '../../../types/Data';
import * as yup from 'yup';
import authenticate from '../../../middlware/authenticate';
import Pesanan from '../../../models/Pesanan';

const schema = yup.object().shape({
    kategori_id: yup.number().required(),
    customer_id: yup.number().required(),
    sumber: yup.string().required(),
    type_motor: yup.string().nullable(),
    warna_motor: yup.string().nullable(),
    model_motor: yup.string().nullable(),
    jenis_pembayaran: yup.string().nullable(),
    jenis_service: yup.string().nullable(),
    jadwal_service: yup.string().nullable(),
    jenis_sparepart: yup.string().nullable(),
    nama_sparepart: yup.string().nullable(),
    jenis_keluhan: yup.string().nullable(),
    jenis_informasi: yup.string().nullable(),
    keterangan: yup.string().required(),
    cabang_id: yup.number().required(),
    crm_id: yup.number().required(),
    tujuan_user: yup.string().required(),
    status_kontak: yup.string().required(),
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
                    kategori_id: req.body.kategori_id,
                    customer_id: req.body.customer_id,
                    sumber: req.body.sumber,
                    type_motor: req.body.type_motor,
                    warna_motor: req.body.warna_motor,
                    model_motor: req.body.model_motor,
                    jenis_pembayaran: req.body.jenis_pembayaran,
                    jenis_service: req.body.jenis_service,
                    jadwal_service: req.body.jadwal_service,
                    jenis_sparepart: req.body.jenis_sparepart,
                    nama_sparepart: req.body.nama_sparepart,
                    jenis_keluhan: req.body.jenis_keluhan,
                    jenis_informasi: req.body.jenis_informasi,
                    keterangan: req.body.keterangan,
                    cabang_id: req.body.cabang_id,
                    crm_id: req.body.crm_id,
                    tujuan_user: req.body.tujuan_user,
                    status_kontak: req.body.status_kontak,
                }
    
                const validation = await schema.validate(dataRequest).catch((err) => {
                    return err.errors[0];
                });

                if (validation) {
                    return res.status(400).json({ status: 'error', message: validation });
                }
    
                const { kategori_id, customer_id, sumber, type_motor, warna_motor, model_motor, jenis_pembayaran, jenis_service, jadwal_service, jenis_sparepart, nama_sparepart, jenis_keluhan, jenis_informasi, keterangan, cabang_id, crm_id, tujuan_user, status_kontak } = req.body;

                await Pesanan.create(
                    kategori_id,
                    customer_id,
                    sumber,
                    type_motor,
                    warna_motor,
                    model_motor,
                    jenis_pembayaran,
                    jenis_service,
                    jadwal_service,
                    jenis_sparepart,
                    nama_sparepart,
                    jenis_keluhan,
                    jenis_informasi,
                    keterangan,
                    cabang_id,
                    crm_id,
                    tujuan_user,
                    status_kontak,
                    null,
                    null
                ).then((result) => {
                    if (result.error) {
                        return res.status(400).json({ status: 'error', message: result.error });
                    } else {
                        return res.status(200).json({ status: 'success', message: 'Pesanan created successfully' });
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