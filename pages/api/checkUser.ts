// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "../../utils/get-session";
import { supabase } from "@/utils/supabaseClient";

type Response = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const session = await getSession(req, res);

    // console.log(session);
    console.log("ID");
    console.log(session.id);

    try {
        if (session.room) {
            const { data, error } = await supabase.from("rooms").select().eq("room_code", session.room.room_code);
            if (error) throw error;

            if (!data.length) {
                session.room = {};
                res.status(200).json({
                    user_in_room: false,
                });
            }

            res.status(200).json({ user_in_room: true, room: session.room });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }

    //   if (session.room) res.status(200).json(session.room);
    //   else res.status(200).json(false);

    res.status(200).json(session.room);
}
