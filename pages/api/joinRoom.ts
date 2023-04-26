// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";
import { getSession } from "../../utils/get-session";
import { escape } from "querystring";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body.room_code);
    // console.log(req);

    const { data, error } = await supabase
      .from("rooms")
      .select()
      .eq("room_code", req.body.room_code);

    if (error) throw error;

    console.log(data.length);

    if (data.length) {
      const { error } = await supabase
        .from("rooms")
        .update({ users: [...(data[0].users ?? []), req.body.user_id] })
        .eq("room_code", req.body.room_code);

      if (error) throw error;
      // res.status(400).json({ success: false, message: error.message });

      res.status(200).json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Such room doesn't exist." });
    }

    // console.log(data[0].id);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
