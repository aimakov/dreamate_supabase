// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "../../utils/get-session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);
  //   if (session.room) res.status(200).json(session.room);
  //   else res.status(200).json(false);

  res.status(200).json(session.room);
}
