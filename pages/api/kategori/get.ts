import { NextApiRequest, NextApiResponse } from 'next'
import Data from '../../../types/Data';
import * as yup from 'yup';
import authenticate from '../../../middlware/authenticate';
import Kategori from '../../../models/Kategori';

const schema = yup.object().shape({
    nama_kategori: yup.string().nullable(),
    status_kategori: yup.string().nullable(),
    paginate: yup.boolean().nullable(),
    page: yup.number().nullable(),
    limit: yup.number().nullable(),
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
                    nama_kategori: req.body.nama_kategori,
                    status_kategori: req.body.status_kategori,
                    paginate: req.body.paginate,
                    page: req.body.page,
                    limit: req.body.limit,
                }
    
                const validation = await schema.validate(dataRequest).catch((err) => {
                    return err.errors[0];
                });

                if (!validation) {
                    return res.status(400).json({ status: 'error', message: validation });
                }
    
                const { nama_kategori, status_kategori, paginate, page, limit } = req.body;

                const filters = {
                    nama_kategori,
                    status_kategori,
                }

                if (paginate){
                    await Kategori.allWithFilter(filters, page, limit).then((result) => {
                        if (result.error) {
                            return res.status(400).json({ status: 'error', message: result.error });
                        } else {
                            return res.status(200).json({ status: 'success', message: 'Fetching data success', data: result });
                        }
                    }).catch((err) => {
                        return res.status(500).json({ status: 'error', message: err.message });
                    });
                } else {
                    await Kategori.allWithFilter(filters).then((result) => {
                        if (result.error) {
                            return res.status(400).json({ status: 'error', message: result.error });
                        } else {
                            return res.status(200).json({ status: 'success', message: 'Fetching data success', data: result });
                        }
                    }).catch((err) => {
                        return res.status(500).json({ status: 'error', message: err.message });
                    });
                }
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