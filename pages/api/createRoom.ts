// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";
import { generateRoomCode } from "@/functions/generateRoomCode";

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
  try {
    const { data: roomCodes_data, error: roomCodes_error } = await supabase
      .from("rooms")
      .select("room_code");

    const uniqueRoomCode = generateRoomCode(roomCodes_data);

    const { data: roomNames_data, error: roomNames_error } = await supabase
      .from("rooms")
      .select("room_name");

    if (roomNames_error) console.log(roomNames_error);

    if (
      roomNames_data
        .reduce((acc, val) => [...acc, val.room_name], [])
        .includes(req.body.room_name)
    )
      res.status(400).json({ message: "Such room exists." });
    else {
      const { data, error } = await supabase.from("rooms").upsert({
        room_code: uniqueRoomCode,
        room_name: req.body.room_name,
        host: req.body.host,
      });

      console.log(error);

      if (error) res.status(400).json({ message: error.message });

      res
        .status(200)
        .json({ message: `Room ${req.body.room_name} is created!` });
    }

    // if (roomCodes_error) throw roomCodes_error;

    // const session = await getSession(req, res);
    // session.views = session.views ? session.views + 1 : 1;
    // session.room = { room_code: "QWERTY", host: true };
    // Also available under req.session:
    // req.session.views = req.session.views ? req.session.views + 1 : 1;
    // res.status(200).json(session);
  } catch (error) {}
}
