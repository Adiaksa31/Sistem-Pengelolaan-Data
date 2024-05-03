import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";

type ResponseData = {
  message: string,
  data: any
};

// req = HTTP incoming message, res = HTTP server response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const komik = await excuteQuery({
    query: 'SELECT * FROM komik',
    values: []
  });

  res.status(200).json({
    message: "Hello World " + req.query.name,
    data: komik
  });
}