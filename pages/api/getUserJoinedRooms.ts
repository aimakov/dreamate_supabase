// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "../../utils/get-session";
import { supabase } from "@/utils/supabaseClient";

type Response = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const { data, error } = await supabase.from("rooms").select();
        if (error) throw error;

        if (data.length) {
            res.status(200).json(data.filter((room) => room.users?.reduce((acc, val) => [...acc, val.user_id], []).includes(req.body.user_id)));
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }

    //   if (session.room) res.status(200).json(session.room);
    //   else res.status(200).json(false);
}
