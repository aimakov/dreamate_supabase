import Layout from "@/components/Layout";
import Link from "next/link";

import { useEffect, useState } from "react";

import { supabase } from "../utils/supabaseClient";

// interface Room {
//     id: string,
//     room_code: string,
//     created_at: Date,
//     players:
// }

export default function Home() {
    const getRooms = async () => {
        try {
            const { data, error } = await supabase.from("rooms").select("room_code");
            if (error) throw error;

            if (data.length) return data.reduce((acc: any, val) => [...acc, val.room_code], []);
        } catch (error) {
            console.log(error);
        }
    };

    const generateRoomCode = (existingRoomCodes: any) => {
        const length = 6;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let code = "";

        // console.log(getRooms());

        while (true) {
            let result = [];
            for (let i = 0; i < length; i++) {
                result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
            }
            code = result.join("");
            if (!existingRoomCodes.includes(code)) break;
        }

        return code;
    };

    const createRoom = async () => {
        try {
            const { data: roomCodes_data, error: roomCodes_error } = await supabase.from("rooms").select("room_code");
            if (roomCodes_error) throw roomCodes_error;

            const uniqueRoomCode = generateRoomCode(roomCodes_data);

            console.log(uniqueRoomCode);

            const { error } = await supabase.from("rooms").insert({ room_code: uniqueRoomCode });
            if (error) throw error;

            console.log("New room created: " + uniqueRoomCode);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const data = getRooms();
        console.log(data);
    }, []);

    return (
        <Layout>
            <div className="w-full min-h-screen flex flex-col justify-center items-center">
                <img src={"/logo.png"} alt="logo" className="w-3/4" />

                <div className="flex flex-col mt-10 gap-3">
                    <button onClick={createRoom} className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">
                        Create room
                    </button>

                    <button className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">Join room</button>
                </div>
            </div>
        </Layout>
    );
}
