// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: any;
};

import { getSession } from "../../utils/get-session";

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: "John Doe" });
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);
  session.views = session.views ? session.views + 1 : 1;
  session.room = { room_code: "QWERTY", host: true };
  // Also available under req.session:
  // req.session.views = req.session.views ? req.session.views + 1 : 1;
  res.status(200).json(session);
}
