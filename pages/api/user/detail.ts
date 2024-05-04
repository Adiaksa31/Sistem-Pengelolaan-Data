import { NextApiRequest, NextApiResponse } from 'next'
import Data from '../../../types/Data';
import * as yup from 'yup';
import authenticate from '../../../middlware/authenticate';
import User from '../../../models/User';

const schema = yup.object().shape({
    id: yup.number().required(),
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
                }
    
                const validation = await schema.validate(dataRequest).catch((err) => {
                    return err.errors[0];
                });

                if (!validation) {
                    return res.status(400).json({ status: 'error', message: validation });
                }
    
                const { id } = req.body;

                await User.findById(
                    id,
                ).then((result) => {
                    if (result) {
                        return res.status(200).json({ status: 'success', message: 'User found', data: result });
                    } else {
                        return res.status(400).json({ status: 'error', message: 'User not found' });
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