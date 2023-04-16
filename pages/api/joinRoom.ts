// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";
import { getSession } from "../../utils/get-session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log(req.body.roomCode);

        const { data, error } = await supabase.from("rooms").select().eq("room_code", req.body.room_code);

        if (error) throw error;

        if (data.length) {
            const session = await getSession(req, res);
            session.room = { room_code: req.body.room_code, host: false };
            console.log(session);
            res.status(200).json({ success: true });
        }

        // console.log(data[0].id);
    } catch (error) {
        res.status(400).json({ success: false });
    }

    const session = await getSession(req, res);
    //   if (session.room) res.status(200).json(session.room);
    //   else res.status(200).json(false);

    res.status(200).json(session.room);
}
