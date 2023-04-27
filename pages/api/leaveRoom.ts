// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log(req.body.room_code);
        console.log("Reached leave room api endpoint");

        const { data, error } = await supabase.from("rooms").select().eq("room_code", req.body.room_code);

        if (error) throw error;

        if (data.length) {
            const { error } = await supabase
                .from("rooms")
                .update({
                    users: data[0].users.filter((user: any) => user.user_id !== req.body.user_id),
                })
                .eq("room_code", req.body.room_code);

            if (error) throw error;

            res.status(200).json({ success: true });
        }

        // console.log(data[0].id);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }

    //   if (session.room) res.status(200).json(session.room);
    //   else res.status(200).json(false);
}
